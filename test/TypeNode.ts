import * as assert from 'assert'
import * as T from '../src/TypeNode'
import * as S from '../src/Schema'
import { pipe } from 'fp-ts/lib/pipeable'

function assertTypeNode<A>(typeNode: T.TypeNode<A>, expected: string): void {
  assert.strictEqual(S.print(typeNode.typeNode()), expected)
}

describe('TypeNode', () => {
  it('string', () => {
    assertTypeNode(T.string, 'string')
  })

  it('number', () => {
    assertTypeNode(T.number, 'number')
  })

  it('boolean', () => {
    assertTypeNode(T.boolean, 'boolean')
  })

  it('UnknownArray', () => {
    assertTypeNode(T.UnknownArray, 'Array<unknown>')
  })

  it('UnknownRecord', () => {
    assertTypeNode(T.UnknownRecord, 'Record<string, unknown>')
  })

  it('literal', () => {
    assertTypeNode(T.literal(1, 'a', null, true), '1 | "a" | null | true')
    assertTypeNode(T.literal(), 'never')
  })

  it('nullable', () => {
    assertTypeNode(T.nullable(T.string), 'null | string')
  })

  it('type', () => {
    assertTypeNode(T.type({ a: T.string }), '{\n    a: string;\n}')
  })

  it('partial', () => {
    assertTypeNode(T.partial({ a: T.string }), 'Partial<{\n    a: string;\n}>')
  })

  it('array', () => {
    assertTypeNode(T.array(T.string), 'Array<string>')
  })

  it('record', () => {
    assertTypeNode(T.record(T.number), 'Record<string, number>')
  })

  it('union', () => {
    assertTypeNode(T.union(T.string, T.number), 'string | number')
  })

  it('intersection', () => {
    assertTypeNode(pipe(T.string, T.intersect(T.number)), 'string & number')
  })

  it('tuple', () => {
    assertTypeNode(T.tuple(T.string, T.number), '[string, number]')
  })

  it('sum', () => {
    const sum = T.sum('_tag')
    assertTypeNode(
      sum({
        A: T.type({ _tag: T.literal('A'), a: T.string }),
        B: T.type({ _tag: T.literal('B'), b: T.number })
      }),
      '{\n    _tag: "A";\n    a: string;\n} | {\n    _tag: "B";\n    b: number;\n}'
    )
    assertTypeNode(sum({}), 'never')
  })

  describe('lazy', () => {
    it('by reference', () => {
      assertTypeNode(
        T.lazy('A', () => pipe(T.type({ a: T.number }), T.intersect(T.partial({ b: T.reference('A') })))),
        '{\n    a: number;\n} & Partial<{\n    b: A;\n}>'
      )
    })

    it('by variable reference', () => {
      interface A {
        a: number
        b?: A
      }

      const typeNode: T.TypeNode<A> = T.lazy('A', () =>
        pipe(T.type({ a: T.number }), T.intersect(T.partial({ b: typeNode })))
      )

      assertTypeNode(typeNode, '{\n    a: number;\n} & Partial<{\n    b: A;\n}>')
    })
  })
})
