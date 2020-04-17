---
title: Schema.ts
nav_order: 4
parent: Modules
---

# Schema overview

Added in v0.4.4

---

<h2 class="text-delta">Table of contents</h2>

- [Declaration (interface)](#declaration-interface)
- [Schema (interface)](#schema-interface)
- [declaration](#declaration)
- [getRuntime](#getruntime)
- [getRuntimeTypeAnnotation](#getruntimetypeannotation)
- [getStatic](#getstatic)
- [make](#make)
- [print](#print)
- [printAll](#printall)
- [sort](#sort)

---

# Declaration (interface)

**Signature**

```ts
export interface Declaration<A> {
  readonly id: string
  readonly schema: Schema<A>
}
```

Added in v0.4.4

# Schema (interface)

**Signature**

```ts
export interface Schema<A> {
  <S extends URIS>(S: Referenceable<S>): Kind<S, A>
}
```

Added in v0.4.4

# declaration

**Signature**

```ts
export declare function declaration<A>(id: string, schema: Schema<A>): Declaration<A>
```

Added in v0.4.4

# getRuntime

**Signature**

```ts
export declare function getRuntime<A>(declaration: Declaration<A>, type?: ts.TypeNode): ts.VariableStatement
```

Added in v0.4.4

# getRuntimeTypeAnnotation

**Signature**

```ts
export declare function getRuntimeTypeAnnotation<A>(declaration: Declaration<A>): ts.TypeNode
```

Added in v0.4.4

# getStatic

**Signature**

```ts
export declare function getStatic<A>(declaration: Declaration<A>): ts.TypeAliasDeclaration
```

Added in v0.4.4

# make

**Signature**

```ts
export declare function make<A>(f: Schema<A>): Schema<A>
```

Added in v0.4.4

# print

**Signature**

```ts
export declare function print(node: ts.Node): string
```

Added in v0.4.4

# printAll

**Signature**

```ts
export declare function printAll<A>(declarations: Array<Declaration<A>>): string
```

Added in v0.4.4

# sort

**Signature**

```ts
export declare function sort<A>(declarations: Array<Declaration<A>>): Array<Declaration<A>>
```

Added in v0.4.0
