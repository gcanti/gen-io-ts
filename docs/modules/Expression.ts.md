---
title: Expression.ts
nav_order: 1
parent: Modules
---

# Expression overview

Added in v0.4.4

---

<h2 class="text-delta">Table of contents</h2>

- [Expression (interface)](#expression-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [UnknownArray](#unknownarray)
- [UnknownRecord](#unknownrecord)
- [array](#array)
- [boolean](#boolean)
- [expression](#expression)
- [intersect](#intersect)
- [lazy](#lazy)
- [literal](#literal)
- [nullable](#nullable)
- [number](#number)
- [partial](#partial)
- [record](#record)
- [reference](#reference)
- [referenceable](#referenceable)
- [string](#string)
- [sum](#sum)
- [tuple](#tuple)
- [type](#type)
- [union](#union)

---

# Expression (interface)

**Signature**

```ts
export interface Expression<A> {
  readonly expression: () => C.Const<ts.Expression, A>
  readonly dependencies: () => Array<string>
}
```

Added in v0.4.4

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.4.4

# URI

**Signature**

```ts
export declare const URI: 'Expression'
```

Added in v0.4.4

# UnknownArray

**Signature**

```ts
export declare const UnknownArray: Expression<unknown[]>
```

Added in v0.4.4

# UnknownRecord

**Signature**

```ts
export declare const UnknownRecord: Expression<Record<string, unknown>>
```

Added in v0.4.4

# array

**Signature**

```ts
export declare function array<A>(items: Expression<A>): Expression<Array<A>>
```

Added in v0.4.4

# boolean

**Signature**

```ts
export declare const boolean: Expression<boolean>
```

Added in v0.4.4

# expression

**Signature**

```ts
export declare const expression: Referenceable<'Expression'>
```

Added in v0.4.4

# intersect

**Signature**

```ts
export declare function intersect<B>(right: Expression<B>): <A>(left: Expression<A>) => Expression<A & B>
```

Added in v0.4.4

# lazy

**Signature**

```ts
export declare function lazy<A>(id: string, f: () => Expression<A>): Expression<A>
```

Added in v0.4.4

# literal

**Signature**

```ts
export declare function literal<A extends ReadonlyArray<S.Literal>>(...values: A): Expression<A[number]>
```

Added in v0.4.4

# nullable

**Signature**

```ts
export declare function nullable<A>(or: Expression<A>): Expression<null | A>
```

Added in v0.4.4

# number

**Signature**

```ts
export declare const number: Expression<number>
```

Added in v0.4.4

# partial

**Signature**

```ts
export declare function partial<A>(properties: { [K in keyof A]: Expression<A[K]> }): Expression<Partial<A>>
```

Added in v0.4.4

# record

**Signature**

```ts
export declare function record<A>(codomain: Expression<A>): Expression<Record<string, A>>
```

Added in v0.4.4

# reference

**Signature**

```ts
export declare function reference<A>(id: string): Expression<A>
```

Added in v0.4.4

# referenceable

**Signature**

```ts
export declare const referenceable: ts.Identifier
```

Added in v0.4.4

# string

**Signature**

```ts
export declare const string: Expression<string>
```

Added in v0.4.4

# sum

**Signature**

```ts
export declare function sum<T extends string>(
  tag: T
): <A>(members: { [K in keyof A]: Expression<A[K]> }) => Expression<A[keyof A]>
```

Added in v0.4.4

# tuple

**Signature**

```ts
export declare function tuple<A extends ReadonlyArray<unknown>>(
  ...components: { [K in keyof A]: Expression<A[K]> }
): Expression<A>
```

Added in v0.4.4

# type

**Signature**

```ts
export declare function type<A>(properties: { [K in keyof A]: Expression<A[K]> }): Expression<A>
```

Added in v0.4.4

# union

**Signature**

```ts
export declare function union<A extends readonly [unknown, ...Array<unknown>]>(
  ...members: { [K in keyof A]: Expression<A[K]> }
): Expression<A[number]>
```

Added in v0.4.4
