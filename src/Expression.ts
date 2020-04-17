/**
 * @since 0.4.4
 */
import * as C from 'fp-ts/lib/Const'
import * as ts from 'typescript'
import * as S from 'io-ts/lib/Schemable'
import { Referenceable } from './Referenceable'
import * as A from 'fp-ts/lib/Array'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 0.4.4
 */
export interface Expression<A> {
  readonly expression: () => C.Const<ts.Expression, A>
  readonly dependencies: () => Array<string>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 0.4.4
 */
export function reference<A>(id: string): Expression<A> {
  return {
    expression: () => C.make(ts.createCall(ts.createIdentifier(id), undefined, [referenceable])),
    dependencies: () => [id]
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

const toLiteralExpression = fold<ts.Expression>(
  (s) => ts.createStringLiteral(s),
  (n) => ts.createNumericLiteral(String(n)),
  (b) => ts.createLiteral(b),
  () => ts.createNull()
)

/**
 * @since 0.4.4
 */
export const referenceable = ts.createIdentifier('S')

/**
 * @since 0.4.4
 */
export function literal<A extends ReadonlyArray<S.Literal>>(...values: A): Expression<A[number]> {
  return {
    expression: () =>
      C.make(
        ts.createCall(ts.createPropertyAccess(referenceable, 'literal'), undefined, values.map(toLiteralExpression))
      ),
    dependencies: () => A.empty
  }
}

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 0.4.4
 */
export const string: Expression<string> = {
  expression: () => C.make(ts.createPropertyAccess(referenceable, 'string')),
  dependencies: () => A.empty
}

/**
 * @since 0.4.4
 */
export const number: Expression<number> = {
  expression: () => C.make(ts.createPropertyAccess(referenceable, 'number')),
  dependencies: () => A.empty
}

/**
 * @since 0.4.4
 */
export const boolean: Expression<boolean> = {
  expression: () => C.make(ts.createPropertyAccess(referenceable, 'boolean')),
  dependencies: () => A.empty
}

/**
 * @since 0.4.4
 */
export const UnknownArray: Expression<Array<unknown>> = {
  expression: () => C.make(ts.createPropertyAccess(referenceable, 'UnknownArray')),
  dependencies: () => A.empty
}

/**
 * @since 0.4.4
 */
export const UnknownRecord: Expression<Record<string, unknown>> = {
  expression: () => C.make(ts.createPropertyAccess(referenceable, 'UnknownRecord')),
  dependencies: () => A.empty
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 0.4.4
 */
export function nullable<A>(or: Expression<A>): Expression<null | A> {
  return {
    expression: () =>
      C.make(ts.createCall(ts.createPropertyAccess(referenceable, 'nullable'), undefined, [or.expression()])),
    dependencies: or.dependencies
  }
}

const foldDependencies = A.array.foldMap(A.getMonoid<string>())

/**
 * @since 0.4.4
 */
export function type<A>(properties: { [K in keyof A]: Expression<A[K]> }): Expression<A> {
  const expressions: Record<string, Expression<unknown>> = properties
  return {
    expression: () =>
      C.make(
        ts.createCall(ts.createPropertyAccess(referenceable, 'type'), undefined, [
          ts.createObjectLiteral(
            Object.keys(expressions).map((k) => ts.createPropertyAssignment(k, expressions[k].expression()))
          )
        ])
      ),
    dependencies: () => foldDependencies(Object.keys(expressions), (k) => expressions[k].dependencies())
  }
}

/**
 * @since 0.4.4
 */
export function partial<A>(properties: { [K in keyof A]: Expression<A[K]> }): Expression<Partial<A>> {
  const expressions: Record<string, Expression<unknown>> = properties
  return {
    expression: () =>
      C.make(
        ts.createCall(ts.createPropertyAccess(referenceable, 'partial'), undefined, [
          ts.createObjectLiteral(
            Object.keys(expressions).map((k) => ts.createPropertyAssignment(k, expressions[k].expression()))
          )
        ])
      ),
    dependencies: () => foldDependencies(Object.keys(expressions), (k) => expressions[k].dependencies())
  }
}

/**
 * @since 0.4.4
 */
export function record<A>(codomain: Expression<A>): Expression<Record<string, A>> {
  return {
    expression: () =>
      C.make(ts.createCall(ts.createPropertyAccess(referenceable, 'record'), undefined, [codomain.expression()])),
    dependencies: codomain.dependencies
  }
}

/**
 * @since 0.4.4
 */
export function array<A>(items: Expression<A>): Expression<Array<A>> {
  return {
    expression: () =>
      C.make(ts.createCall(ts.createPropertyAccess(referenceable, 'array'), undefined, [items.expression()])),
    dependencies: items.dependencies
  }
}

/**
 * @since 0.4.4
 */
export function tuple<A extends ReadonlyArray<unknown>>(
  ...components: { [K in keyof A]: Expression<A[K]> }
): Expression<A> {
  return {
    expression: () =>
      C.make(
        ts.createCall(
          ts.createPropertyAccess(referenceable, 'tuple'),
          undefined,
          components.map((c) => c.expression())
        )
      ),
    dependencies: () => foldDependencies([...components], (e) => e.dependencies())
  }
}

/**
 * @since 0.4.4
 */
export function intersect<B>(right: Expression<B>): <A>(left: Expression<A>) => Expression<A & B> {
  return (left) => ({
    expression: () =>
      C.make(
        ts.createCall(ts.createPropertyAccess(referenceable, 'intersection'), undefined, [
          left.expression(),
          right.expression()
        ])
      ),
    dependencies: () => left.dependencies().concat(right.dependencies())
  })
}

/**
 * @since 0.4.4
 */
export function sum<T extends string>(
  tag: T
): <A>(members: { [K in keyof A]: Expression<A[K]> }) => Expression<A[keyof A]> {
  return (members: Record<string, Expression<unknown>>) => {
    return {
      expression: () =>
        C.make(
          ts.createCall(
            ts.createCall(ts.createPropertyAccess(referenceable, 'sum'), undefined, [ts.createStringLiteral(tag)]),
            undefined,
            [
              ts.createObjectLiteral(
                Object.keys(members).map((k) => ts.createPropertyAssignment(k, members[k].expression()))
              )
            ]
          )
        ),
      dependencies: () => foldDependencies(Object.keys(members), (k) => members[k].dependencies())
    }
  }
}

/**
 * @since 0.4.4
 */
export function lazy<A>(id: string, f: () => Expression<A>): Expression<A> {
  let bailOut = false
  return {
    expression: () => {
      if (!bailOut) {
        bailOut = true
        const out = C.make(
          ts.createCall(ts.createPropertyAccess(referenceable, 'lazy'), undefined, [
            ts.createStringLiteral(id),
            ts.createArrowFunction(undefined, undefined, [], undefined, undefined, f().expression())
          ])
        )
        bailOut = false
        return out
      }
      return C.make(ts.createCall(ts.createIdentifier(id), undefined, [referenceable]))
    },
    dependencies: () => A.empty
  }
}

/**
 * @since 0.4.4
 */
export function union<A extends readonly [unknown, ...Array<unknown>]>(
  ...members: { [K in keyof A]: Expression<A[K]> }
): Expression<A[number]> {
  return {
    expression: () =>
      C.make(
        ts.createCall(
          ts.createPropertyAccess(referenceable, 'union'),
          undefined,
          members.map((m) => m.expression())
        )
      ),
    dependencies: () => foldDependencies([...members], (e) => e.dependencies())
  }
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 0.4.4
 */
export const URI = 'Expression'

/**
 * @since 0.4.4
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Expression: Expression<A>
  }
}

/**
 * @since 0.4.4
 */
export const expression: Referenceable<URI> = {
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
