import * as assert from 'assert'
import * as S from '../src/Schema'

describe('Schema', () => {
  const declaration = S.declaration(
    'A',
    S.make((S) =>
      S.type({
        name: S.string,
        age: S.number,
        tag: S.reference('Tag')
      })
    )
  )
  it('getRuntime', () => {
    assert.deepStrictEqual(
      S.print(S.getRuntime(declaration)),
      'export const A = S.make(S => S.type({ name: S.string, age: S.number, tag: Tag(S) }));'
    )
  })

  it('getRuntimeTypeAnnotation', () => {
    assert.deepStrictEqual(S.print(S.getRuntimeTypeAnnotation(declaration)), 'S.Schema<A>')
  })

  it('getStatic', () => {
    assert.deepStrictEqual(
      S.print(S.getStatic(declaration)),
      'export type A = {\n    name: string;\n    age: number;\n    tag: Tag;\n};'
    )
  })

  it('getDependencyGraph', () => {
    const graph = S.getDependencyGraph([
      S.declaration(
        'B',
        S.make((S) => S.type({ b: S.string }))
      ),
      S.declaration(
        'A',
        S.make((S) => S.type({ a: S.reference('B') }))
      )
    ])
    assert.deepStrictEqual(graph, { A: ['B'], B: [] })
  })

  it('topologicalSort', () => {
    assert.deepStrictEqual(S.topologicalSort({}), [])
    assert.deepStrictEqual(S.topologicalSort({ A: [] }), ['A'])
    assert.deepStrictEqual(
      S.topologicalSort({
        A: ['B'],
        B: []
      }),
      ['B', 'A']
    )
    assert.deepStrictEqual(
      S.topologicalSort({
        A: ['B'],
        B: ['C'],
        C: ['B', 'D'],
        D: []
      }),
      ['B', 'C', 'D', 'A']
    )
  })
})
