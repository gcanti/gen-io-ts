/**
 * @since 0.4.4
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { memoize } from 'io-ts/lib/Schemable'
import * as ts from 'typescript'
import * as E from './Expression'
import * as T from './TypeNode'
import { Referenceable } from './Referenceable'

/**
 * @since 0.4.4
 */
export interface Schema<A> {
  <S extends URIS>(S: Referenceable<S>): Kind<S, A>
}

/**
 * @since 0.4.4
 */
export function make<A>(f: Schema<A>): Schema<A> {
  return memoize(f)
}

/**
 * @since 0.4.4
 */
export interface Declaration<A> {
  readonly id: string
  readonly schema: Schema<A>
}

/**
 * @since 0.4.4
 */
export function declaration<A>(id: string, schema: Schema<A>): Declaration<A> {
  return { id, schema }
}

/**
 * @since 0.4.4
 */
export function getRuntime<A>(declaration: Declaration<A>, type?: ts.TypeNode): ts.VariableStatement {
  const expression = declaration.schema(E.expression).expression()
  const inizializer = ts.createCall(ts.createPropertyAccess(E.referenceable, 'make'), undefined, [
    ts.createArrowFunction(
      undefined,
      undefined,
      [ts.createParameter(undefined, undefined, undefined, E.referenceable)],
      undefined,
      undefined,
      expression
    )
  ])
  return ts.createVariableStatement(
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList(
      [ts.createVariableDeclaration(declaration.id, type, inizializer)],
      ts.NodeFlags.Const
    )
  )
}

/**
 * @since 0.4.4
 */
export function getRuntimeTypeAnnotation<A>(declaration: Declaration<A>): ts.TypeNode {
  return ts.createTypeReferenceNode(ts.createQualifiedName(E.referenceable, 'Schema'), [
    ts.createTypeReferenceNode(declaration.id, undefined)
  ])
}

/**
 * @since 0.4.4
 */
export function getStatic<A>(declaration: Declaration<A>): ts.TypeAliasDeclaration {
  return ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    declaration.id,
    undefined,
    declaration.schema(T.typeNode).typeNode()
  )
}

type DependencyGraph = Record<string, Array<string>>

/**
 * @internal
 */
export function getDependencyGraph(declarations: Array<Declaration<any>>): DependencyGraph {
  const graph: DependencyGraph = {}
  declarations.forEach((d) => {
    graph[d.id] = d.schema(E.expression).dependencies()
  })
  return graph
}

/**
 * @internal
 */
export function topologicalSort(graph: DependencyGraph): Array<string> {
  const out: Array<string> = []
  const visited: Record<string, boolean> = {}
  const lazy: Record<string, boolean> = {}
  function visit(id: string, ancestors: Array<string>) {
    if (visited[id] || !graph.hasOwnProperty(id)) {
      return
    }
    const dependecies = graph[id]
    ancestors.push(id)
    visited[id] = true
    dependecies.forEach((dependecy) => {
      if (ancestors.indexOf(dependecy) !== -1) {
        lazy[id] = true
        lazy[dependecy] = true
      } else {
        visit(dependecy, ancestors.slice())
      }
    })
    out.unshift(id)
  }
  Object.keys(graph).forEach((id) => visit(id, []))
  return Object.keys(lazy)
    .reverse()
    .concat(out.reverse().filter((id) => !lazy.hasOwnProperty(id)))
}

/**
 * @since 0.4.0
 */
export function sort<A>(declarations: Array<Declaration<A>>): Array<Declaration<A>> {
  return topologicalSort(getDependencyGraph(declarations)).map((id) => declarations.find((d) => d.id === id)!)
}

// -------------------------------------------------------------------------------------
// printer
// -------------------------------------------------------------------------------------

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
})

const source = ts.createSourceFile('', '', ts.ScriptTarget.Latest)

/**
 * @since 0.4.4
 */
export function print(node: ts.Node): string {
  return printer.printNode(ts.EmitHint.Unspecified, node, source)
}

/**
 * @since 0.4.4
 */
export function printAll<A>(declarations: Array<Declaration<A>>): string {
  return sort(declarations)
    .map((d) => print(getStatic(d)) + '\n' + print(getRuntime(d, getRuntimeTypeAnnotation(d))))
    .join('\n\n')
}
