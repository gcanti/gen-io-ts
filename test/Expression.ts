import * as assert from 'assert'
import * as E from '../src/Expression'
import * as S from '../src/Schema'
import { pipe } from 'fp-ts/lib/pipeable'

function assertExpression<A>(expression: E.Expression<A>, expected: string): void {
  assert.deepStrictEqual(S.print(expression.expression()), expected)
}

describe('Expression', () => {
  it('string', () => {
    assertExpression(E.string, 'S.string')
    assert.deepStrictEqual(E.string.dependencies(), [])
  })

  it('number', () => {
    assertExpression(E.number, 'S.number')
    assert.deepStrictEqual(E.number.dependencies(), [])
  })

  it('boolean', () => {
    assertExpression(E.boolean, 'S.boolean')
    assert.deepStrictEqual(E.boolean.dependencies(), [])
  })

  it('UnknownArray', () => {
    assertExpression(E.UnknownArray, 'S.UnknownArray')
    assert.deepStrictEqual(E.UnknownArray.dependencies(), [])
  })

  it('UnknownRecord', () => {
    assertExpression(E.UnknownRecord, 'S.UnknownRecord')
    assert.deepStrictEqual(E.UnknownRecord.dependencies(), [])
  })

  it('literal', () => {
    assertExpression(E.literal(1, 'a', null, true), 'S.literal(1, "a", null, true)')
    assertExpression(E.literal(), 'S.literal()')
  })

  it('nullable', () => {
    assertExpression(E.nullable(E.string), 'S.nullable(S.string)')
  })

  it('type', () => {
    assertExpression(E.type({ a: E.string }), 'S.type({ a: S.string })')
  })

  it('partial', () => {
    assertExpression(E.partial({ a: E.string }), 'S.partial({ a: S.string })')
  })

  it('array', () => {
    assertExpression(E.array(E.string), 'S.array(S.string)')
  })

  it('record', () => {
    assertExpression(E.record(E.number), 'S.record(S.number)')
  })

  it('union', () => {
    assertExpression(E.union(E.string, E.number), 'S.union(S.string, S.number)')
  })

  it('intersection', () => {
    assertExpression(pipe(E.string, E.intersect(E.number)), 'S.intersection(S.string, S.number)')
  })

  it('tuple', () => {
    assertExpression(E.tuple(E.string, E.number), 'S.tuple(S.string, S.number)')
  })

  it('sum', () => {
    const sum = E.sum('_tag')
    assertExpression(
      sum({
        A: E.type({ _tag: E.literal('A'), a: E.string }),
        B: E.type({ _tag: E.literal('B'), b: E.number })
      }),
      'S.sum("_tag")({ A: S.type({ _tag: S.literal("A"), a: S.string }), B: S.type({ _tag: S.literal("B"), b: S.number }) })'
    )
    assertExpression(sum({}), 'S.sum("_tag")({})')
  })

  describe('lazy', () => {
    it('by reference', () => {
      assertExpression(
        E.lazy('A', () => pipe(E.type({ a: E.number }), E.intersect(E.partial({ b: E.reference('A') })))),
        'S.lazy("A", () => S.intersection(S.type({ a: S.number }), S.partial({ b: A(S) })))'
      )
    })

    it('by variable reference', () => {
      interface A {
        a: number
        b?: A
      }

      const expression: E.Expression<A> = E.lazy('A', () =>
        pipe(E.type({ a: E.number }), E.intersect(E.partial({ b: expression })))
      )

      assertExpression(expression, 'S.lazy("A", () => S.intersection(S.type({ a: S.number }), S.partial({ b: A(S) })))')
      assert.deepStrictEqual(expression.dependencies(), [])
    })
  })

  describe('dependencies', () => {
    const dependency = E.type({ _tag: E.literal('R'), a: E.reference('R') })

    it('nullable', () => {
      assert.deepStrictEqual(E.nullable(dependency).dependencies(), ['R'])
    })

    it('type', () => {
      assert.deepStrictEqual(E.type({ a: dependency }).dependencies(), ['R'])
    })

    it('partial', () => {
      assert.deepStrictEqual(E.partial({ a: dependency }).dependencies(), ['R'])
    })

    it('record', () => {
      assert.deepStrictEqual(E.record(dependency).dependencies(), ['R'])
    })

    it('array', () => {
      assert.deepStrictEqual(E.array(dependency).dependencies(), ['R'])
    })

    it('tuple', () => {
      assert.deepStrictEqual(E.tuple(dependency).dependencies(), ['R'])
    })

    it('intersection', () => {
      assert.deepStrictEqual(pipe(E.string, E.intersect(dependency)).dependencies(), ['R'])
    })

    it('sum', () => {
      assert.deepStrictEqual(
        E.sum('_tag')({
          R: dependency
        }).dependencies(),
        ['R']
      )
    })

    it('union', () => {
      assert.deepStrictEqual(E.union(E.string, dependency).dependencies(), ['R'])
    })
  })
})
