---
title: TypeNode.ts
nav_order: 5
parent: Modules
---

# TypeNode overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [TypeNode (interface)](#typenode-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [UnknownArray](#unknownarray)
- [UnknownRecord](#unknownrecord)
- [array](#array)
- [boolean](#boolean)
- [intersect](#intersect)
- [lazy](#lazy)
- [literal](#literal)
- [nullable](#nullable)
- [number](#number)
- [partial](#partial)
- [record](#record)
- [reference](#reference)
- [string](#string)
- [sum](#sum)
- [tuple](#tuple)
- [type](#type)
- [typeNode](#typenode)
- [union](#union)

---

# TypeNode (interface)

**Signature**

```ts
export interface TypeNode<A> {
  readonly typeNode: () => C.Const<ts.TypeNode, A>
}
```

Added in v3.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

# URI

**Signature**

```ts
export declare const URI: 'TypeNode'
```

Added in v3.0.0

# UnknownArray

**Signature**

```ts
export declare const UnknownArray: TypeNode<unknown[]>
```

Added in v3.0.0

# UnknownRecord

**Signature**

```ts
export declare const UnknownRecord: TypeNode<Record<string, unknown>>
```

Added in v3.0.0

# array

**Signature**

```ts
export declare function array<A>(items: TypeNode<A>): TypeNode<Array<A>>
```

Added in v3.0.0

# boolean

**Signature**

```ts
export declare const boolean: TypeNode<boolean>
```

Added in v3.0.0

# intersect

**Signature**

```ts
export declare function intersect<B>(right: TypeNode<B>): <A>(left: TypeNode<A>) => TypeNode<A & B>
```

Added in v3.0.0

# lazy

**Signature**

```ts
export declare function lazy<A>(id: string, f: () => TypeNode<A>): TypeNode<A>
```

Added in v3.0.0

# literal

**Signature**

```ts
export declare function literal<A extends ReadonlyArray<S.Literal>>(...values: A): TypeNode<A[number]>
```

Added in v3.0.0

# nullable

**Signature**

```ts
export declare function nullable<A>(or: TypeNode<A>): TypeNode<null | A>
```

Added in v3.0.0

# number

**Signature**

```ts
export declare const number: TypeNode<number>
```

Added in v3.0.0

# partial

**Signature**

```ts
export declare function partial<A>(properties: { [K in keyof A]: TypeNode<A[K]> }): TypeNode<Partial<A>>
```

Added in v3.0.0

# record

**Signature**

```ts
export declare function record<A>(codomain: TypeNode<A>): TypeNode<Record<string, A>>
```

Added in v3.0.0

# reference

**Signature**

```ts
export declare function reference(id: string): TypeNode<unknown>
```

Added in v3.0.0

# string

**Signature**

```ts
export declare const string: TypeNode<string>
```

Added in v3.0.0

# sum

**Signature**

```ts
export declare function sum<T extends string>(
  _tag: T
): <A>(members: { [K in keyof A]: TypeNode<A[K]> }) => TypeNode<A[keyof A]>
```

Added in v3.0.0

# tuple

**Signature**

```ts
export declare function tuple<A extends ReadonlyArray<unknown>>(
  ...components: { [K in keyof A]: TypeNode<A[K]> }
): TypeNode<A>
```

Added in v3.0.0

# type

**Signature**

```ts
export declare function type<A>(properties: { [K in keyof A]: TypeNode<A[K]> }): TypeNode<A>
```

Added in v3.0.0

# typeNode

**Signature**

```ts
export declare const typeNode: Referenceable<'TypeNode'>
```

Added in v3.0.0

# union

**Signature**

```ts
export declare function union<A extends readonly [unknown, ...Array<unknown>]>(
  ...members: { [K in keyof A]: TypeNode<A[K]> }
): TypeNode<A[number]>
```

Added in v3.0.0
