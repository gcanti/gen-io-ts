/**
 * @since 3.0.0
 */
import * as C from 'fp-ts/lib/Const'
import * as ts from 'typescript'
import * as S from 'io-ts/lib/Schemable'
import { Referenceable } from './Referenceable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface TypeNode<A> {
  readonly typeNode: () => C.Const<ts.TypeNode, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function reference(id: string): TypeNode<unknown> {
  return {
    typeNode: () => C.make(ts.createTypeReferenceNode(id, undefined))
  }
}

function fold<R>(
  onString: (s: string) => R,
  onNumber: (n: number) => R,
  onBoolean: (b: boolean) => R,
  onNull: () => R
): (literal: S.Literal) => R {
  return (literal) => {
    if (typeof literal === 'string') {
      return onString(literal)
    } else if (typeof literal === 'number') {
      return onNumber(literal)
    } else if (typeof literal === 'boolean') {
      return onBoolean(literal)
    } else {
      return onNull()
    }
  }
}

const toLiteralTypeNode = fold<ts.TypeNode>(
  (s) => ts.createLiteralTypeNode(ts.createStringLiteral(s)),
  (n) => ts.createLiteralTypeNode(ts.createNumericLiteral(String(n))),
  (b) => ts.createLiteralTypeNode(ts.createLiteral(b)),
  () => ts.createKeywordTypeNode(ts.SyntaxKind.NullKeyword)
)

const never = {
  typeNode: () => C.make(ts.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword))
}

/**
 * @since 3.0.0
 */
export function literal<A extends ReadonlyArray<S.Literal>>(...values: A): TypeNode<A[number]> {
  if (values.length === 0) {
    return never
  }
  return {
    typeNode: () => C.make(ts.createUnionTypeNode(values.map(toLiteralTypeNode)))
  }
}

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const string: TypeNode<string> = {
  typeNode: () => C.make(ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
}

/**
 * @since 3.0.0
 */
export const number: TypeNode<number> = {
  typeNode: () => C.make(ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
}

/**
 * @since 3.0.0
 */
export const boolean: TypeNode<boolean> = {
  typeNode: () => C.make(ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword))
}

/**
 * @since 3.0.0
 */
export const UnknownArray: TypeNode<Array<unknown>> = {
  typeNode: () => C.make(ts.createTypeReferenceNode('Array', [ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)]))
}

/**
 * @since 3.0.0
 */
export const UnknownRecord: TypeNode<Record<string, unknown>> = {
  typeNode: () =>
    C.make(
      ts.createTypeReferenceNode('Record', [
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
      ])
    )
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

const nullTypeNode: TypeNode<null> = {
  typeNode: () => C.make(ts.createKeywordTypeNode(ts.SyntaxKind.NullKeyword))
}

/**
 * @since 3.0.0
 */
export function nullable<A>(or: TypeNode<A>): TypeNode<null | A> {
  return union(nullTypeNode, or)
}

/**
 * @since 3.0.0
 */
export function type<A>(properties: { [K in keyof A]: TypeNode<A[K]> }): TypeNode<A> {
  const typeNodes: Record<string, TypeNode<unknown>> = properties
  return {
    typeNode: () =>
      C.make(
        ts.createTypeLiteralNode(
          Object.keys(typeNodes).map((k) =>
            ts.createPropertySignature(undefined, k, undefined, typeNodes[k].typeNode(), undefined)
          )
        )
      )
  }
}

/**
 * @since 3.0.0
 */
export function partial<A>(properties: { [K in keyof A]: TypeNode<A[K]> }): TypeNode<Partial<A>> {
  return {
    typeNode: () => C.make(ts.createTypeReferenceNode('Partial', [type(properties).typeNode()]))
  }
}

/**
 * @since 3.0.0
 */
export function record<A>(codomain: TypeNode<A>): TypeNode<Record<string, A>> {
  return {
    typeNode: () =>
      C.make(
        ts.createTypeReferenceNode('Record', [
          ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          codomain.typeNode()
        ])
      )
  }
}

/**
 * @since 3.0.0
 */
export function array<A>(items: TypeNode<A>): TypeNode<Array<A>> {
  return {
    typeNode: () => C.make(ts.createTypeReferenceNode('Array', [items.typeNode()]))
  }
}

/**
 * @since 3.0.0
 */
export function tuple<A extends ReadonlyArray<unknown>>(
  ...components: { [K in keyof A]: TypeNode<A[K]> }
): TypeNode<A> {
  return {
    typeNode: () => C.make(ts.createTupleTypeNode(components.map((c) => c.typeNode())))
  }
}

/**
 * @since 3.0.0
 */
export function intersect<B>(right: TypeNode<B>): <A>(left: TypeNode<A>) => TypeNode<A & B> {
  return (left) => ({
    typeNode: () => C.make(ts.createIntersectionTypeNode([left.typeNode(), right.typeNode()]))
  })
}

/**
 * @since 3.0.0
 */
export function sum<T extends string>(
  _tag: T
): <A>(members: { [K in keyof A]: TypeNode<A[K]> }) => TypeNode<A[keyof A]> {
  return (members: Record<string, TypeNode<unknown>>) => {
    const keys = Object.keys(members)
    if (keys.length === 0) {
      return never
    }
    return {
      typeNode: () => C.make(ts.createUnionTypeNode(keys.map((k) => members[k].typeNode())))
    }
  }
}

/**
 * @since 3.0.0
 */
export function lazy<A>(id: string, f: () => TypeNode<A>): TypeNode<A> {
  let $ref: string
  return {
    typeNode: () => {
      if (!$ref) {
        $ref = id
        return C.make(f().typeNode())
      }
      return C.make(ts.createTypeReferenceNode($ref, undefined))
    }
  }
}

/**
 * @since 3.0.0
 */
export function union<A extends readonly [unknown, ...Array<unknown>]>(
  ...members: { [K in keyof A]: TypeNode<A[K]> }
): TypeNode<A[number]> {
  if (members.length === 0) {
    return never
  }
  return {
    typeNode: () => C.make(ts.createUnionTypeNode(members.map((m) => m.typeNode())))
  }
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const URI = 'TypeNode'

/**
 * @since 3.0.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly TypeNode: TypeNode<A>
  }
}

/**
 * @since 3.0.0
 */
export const typeNode: Referenceable<URI> = {
  URI,
  literal,
  string,
  number,
  boolean,
  UnknownArray,
  UnknownRecord,
  nullable,
  type,
  partial,
  record,
  array,
  tuple: tuple as S.Schemable1<URI>['tuple'],
  intersect,
  sum,
  lazy,
  union: union as S.WithUnion1<URI>['union'],
  reference
}
