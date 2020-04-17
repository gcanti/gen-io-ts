---
title: index.ts
nav_order: 2
parent: Modules
---

# index overview

Added in v0.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [ArrayCombinator (interface)](#arraycombinator-interface)
- [BooleanType (interface)](#booleantype-interface)
- [BrandCombinator (interface)](#brandcombinator-interface)
- [CustomCombinator (interface)](#customcombinator-interface)
- [CustomTypeDeclaration (interface)](#customtypedeclaration-interface)
- [DictionaryCombinator (interface)](#dictionarycombinator-interface)
- [ExactCombinator (interface)](#exactcombinator-interface)
- [FunctionType (interface)](#functiontype-interface)
- [Identifier (interface)](#identifier-interface)
- [IntType (interface)](#inttype-interface)
- [~~IntegerType~~ (interface)](#integertype-interface)
- [InterfaceCombinator (interface)](#interfacecombinator-interface)
- [IntersectionCombinator (interface)](#intersectioncombinator-interface)
- [KeyofCombinator (interface)](#keyofcombinator-interface)
- [LiteralCombinator (interface)](#literalcombinator-interface)
- [NullType (interface)](#nulltype-interface)
- [NumberType (interface)](#numbertype-interface)
- [Optional (interface)](#optional-interface)
- [PartialCombinator (interface)](#partialcombinator-interface)
- [Property (interface)](#property-interface)
- [Readonly (interface)](#readonly-interface)
- [ReadonlyArrayCombinator (interface)](#readonlyarraycombinator-interface)
- [ReadonlyCombinator (interface)](#readonlycombinator-interface)
- [Recursion (interface)](#recursion-interface)
- [RecursiveCombinator (interface)](#recursivecombinator-interface)
- [StrictCombinator (interface)](#strictcombinator-interface)
- [StringType (interface)](#stringtype-interface)
- [TaggedUnionCombinator (interface)](#taggedunioncombinator-interface)
- [TupleCombinator (interface)](#tuplecombinator-interface)
- [TypeDeclaration (interface)](#typedeclaration-interface)
- [UndefinedType (interface)](#undefinedtype-interface)
- [UnionCombinator (interface)](#unioncombinator-interface)
- [UnknownArrayType (interface)](#unknownarraytype-interface)
- [UnknownRecordType (interface)](#unknownrecordtype-interface)
- [UnknownType (interface)](#unknowntype-interface)
- [BasicType (type alias)](#basictype-type-alias)
- [Combinator (type alias)](#combinator-type-alias)
- [Graph (type alias)](#graph-type-alias)
- [Node (type alias)](#node-type-alias)
- [TypeReference (type alias)](#typereference-type-alias)
- [Vertex (class)](#vertex-class)
  - [afters (property)](#afters-property)
- [arrayCombinator](#arraycombinator)
- [booleanType](#booleantype)
- [brandCombinator](#brandcombinator)
- [customCombinator](#customcombinator)
- [customTypeDeclaration](#customtypedeclaration)
- [exactCombinator](#exactcombinator)
- [functionType](#functiontype)
- [getNodeDependencies](#getnodedependencies)
- [getRecursiveTypeDeclaration](#getrecursivetypedeclaration)
- [getTypeDeclarationGraph](#gettypedeclarationgraph)
- [getTypeDeclarationMap](#gettypedeclarationmap)
- [identifier](#identifier)
- [intType](#inttype)
- [intersectionCombinator](#intersectioncombinator)
- [keyofCombinator](#keyofcombinator)
- [literalCombinator](#literalcombinator)
- [nullType](#nulltype)
- [numberType](#numbertype)
- [partialCombinator](#partialcombinator)
- [printRuntime](#printruntime)
- [printStatic](#printstatic)
- [property](#property)
- [readonlyArrayCombinator](#readonlyarraycombinator)
- [readonlyCombinator](#readonlycombinator)
- [recordCombinator](#recordcombinator)
- [recursiveCombinator](#recursivecombinator)
- [sort](#sort)
- [strictCombinator](#strictcombinator)
- [stringType](#stringtype)
- [taggedUnionCombinator](#taggedunioncombinator)
- [tsort](#tsort)
- [tupleCombinator](#tuplecombinator)
- [typeCombinator](#typecombinator)
- [typeDeclaration](#typedeclaration)
- [undefinedType](#undefinedtype)
- [unionCombinator](#unioncombinator)
- [unknownArrayType](#unknownarraytype)
- [unknownRecordType](#unknownrecordtype)
- [unknownType](#unknowntype)
- [~~dictionaryCombinator~~](#dictionarycombinator)
- [~~integerType~~](#integertype)
- [~~interfaceCombinator~~](#interfacecombinator)

---

# ArrayCombinator (interface)

**Signature**

```ts
export interface ArrayCombinator {
  kind: 'ArrayCombinator'
  type: TypeReference
  name?: string
}
```

Added in v0.4.0

# BooleanType (interface)

**Signature**

```ts
export interface BooleanType {
  kind: 'BooleanType'
  name: 'boolean'
}
```

Added in v0.4.0

# BrandCombinator (interface)

**Signature**

```ts
export interface BrandCombinator {
  kind: 'BrandCombinator'
  type: TypeReference
  predicate: (variableName: string) => string
  name: string
}
```

Added in v0.4.0

# CustomCombinator (interface)

**Signature**

```ts
export interface CustomCombinator {
  kind: 'CustomCombinator'
  static: string
  runtime: string
  dependencies: Array<string>
}
```

Added in v0.4.0

# CustomTypeDeclaration (interface)

**Signature**

```ts
export interface CustomTypeDeclaration {
  kind: 'CustomTypeDeclaration'
  name: string
  static: string
  runtime: string
  dependencies: Array<string>
}
```

Added in v0.4.0

# DictionaryCombinator (interface)

**Signature**

```ts
export interface DictionaryCombinator {
  kind: 'DictionaryCombinator'
  domain: TypeReference
  codomain: TypeReference
  name?: string
}
```

Added in v0.4.0

# ExactCombinator (interface)

**Signature**

```ts
export interface ExactCombinator {
  kind: 'ExactCombinator'
  type: TypeReference
  name?: string
}
```

Added in v0.4.0

# FunctionType (interface)

**Signature**

```ts
export interface FunctionType {
  kind: 'FunctionType'
  name: 'Function'
}
```

Added in v0.4.0

# Identifier (interface)

**Signature**

```ts
export interface Identifier {
  kind: 'Identifier'
  name: string
}
```

Added in v0.4.0

# IntType (interface)

**Signature**

```ts
export interface IntType {
  kind: 'IntType'
  name: 'Int'
}
```

Added in v0.4.0

# ~~IntegerType~~ (interface)

**Signature**

```ts
export interface IntegerType {
  kind: 'IntegerType'
  name: 'Integer'
}
```

Added in v0.4.0

# InterfaceCombinator (interface)

**Signature**

```ts
export interface InterfaceCombinator {
  kind: 'InterfaceCombinator'
  properties: Array<Property>
  name?: string
}
```

Added in v0.4.0

# IntersectionCombinator (interface)

**Signature**

```ts
export interface IntersectionCombinator {
  kind: 'IntersectionCombinator'
  types: Array<TypeReference>
  name?: string
}
```

Added in v0.4.0

# KeyofCombinator (interface)

**Signature**

```ts
export interface KeyofCombinator {
  kind: 'KeyofCombinator'
  values: Array<string>
  name?: string
}
```

Added in v0.4.0

# LiteralCombinator (interface)

**Signature**

```ts
export interface LiteralCombinator {
  kind: 'LiteralCombinator'
  value: string | number | boolean
  name?: string
}
```

Added in v0.4.0

# NullType (interface)

**Signature**

```ts
export interface NullType {
  kind: 'NullType'
  name: 'null'
}
```

Added in v0.4.0

# NumberType (interface)

**Signature**

```ts
export interface NumberType {
  kind: 'NumberType'
  name: 'number'
}
```

Added in v0.4.0

# Optional (interface)

**Signature**

```ts
export interface Optional {
  isOptional: boolean
}
```

Added in v0.4.0

# PartialCombinator (interface)

**Signature**

```ts
export interface PartialCombinator {
  kind: 'PartialCombinator'
  properties: Array<Property>
  name?: string
}
```

Added in v0.4.0

# Property (interface)

**Signature**

```ts
export interface Property extends Optional {
  kind: 'Property'
  key: string
  type: TypeReference
  description?: string
}
```

Added in v0.4.0

# Readonly (interface)

**Signature**

```ts
export interface Readonly {
  isReadonly: boolean
}
```

Added in v0.4.0

# ReadonlyArrayCombinator (interface)

**Signature**

```ts
export interface ReadonlyArrayCombinator {
  kind: 'ReadonlyArrayCombinator'
  type: TypeReference
  name?: string
}
```

Added in v0.4.0

# ReadonlyCombinator (interface)

**Signature**

```ts
export interface ReadonlyCombinator {
  kind: 'ReadonlyCombinator'
  type: TypeReference
  name?: string
}
```

Added in v0.4.0

# Recursion (interface)

**Signature**

```ts
export interface Recursion {
  name: string
  output: boolean
}
```

Added in v0.4.0

# RecursiveCombinator (interface)

**Signature**

```ts
export interface RecursiveCombinator {
  kind: 'RecursiveCombinator'
  typeParameter: Identifier
  name: string
  type: TypeReference
}
```

Added in v0.4.0

# StrictCombinator (interface)

**Signature**

```ts
export interface StrictCombinator {
  kind: 'StrictCombinator'
  properties: Array<Property>
  name?: string
}
```

Added in v0.4.0

# StringType (interface)

**Signature**

```ts
export interface StringType {
  kind: 'StringType'
  name: 'string'
}
```

Added in v0.4.0

# TaggedUnionCombinator (interface)

**Signature**

```ts
export interface TaggedUnionCombinator {
  kind: 'TaggedUnionCombinator'
  tag: string
  types: Array<TypeReference>
  name?: string
}
```

Added in v0.4.0

# TupleCombinator (interface)

**Signature**

```ts
export interface TupleCombinator {
  kind: 'TupleCombinator'
  types: Array<TypeReference>
  name?: string
}
```

Added in v0.4.0

# TypeDeclaration (interface)

**Signature**

```ts
export interface TypeDeclaration extends Readonly {
  kind: 'TypeDeclaration'
  name: string
  type: TypeReference
  isExported: boolean
  description?: string
}
```

Added in v0.4.0

# UndefinedType (interface)

**Signature**

```ts
export interface UndefinedType {
  kind: 'UndefinedType'
  name: 'undefined'
}
```

Added in v0.4.0

# UnionCombinator (interface)

**Signature**

```ts
export interface UnionCombinator {
  kind: 'UnionCombinator'
  types: Array<TypeReference>
  name?: string
}
```

Added in v0.4.0

# UnknownArrayType (interface)

**Signature**

```ts
export interface UnknownArrayType {
  kind: 'AnyArrayType'
  name: 'UnknownArray'
}
```

Added in v0.4.0

# UnknownRecordType (interface)

**Signature**

```ts
export interface UnknownRecordType {
  kind: 'AnyDictionaryType'
  name: 'UnknownRecord'
}
```

Added in v0.4.0

# UnknownType (interface)

**Signature**

```ts
export interface UnknownType {
  kind: 'UnknownType'
  name: 'unknown'
}
```

Added in v0.4.0

# BasicType (type alias)

**Signature**

```ts
export type BasicType =
  | StringType
  | NumberType
  | BooleanType
  | NullType
  | UndefinedType
  // tslint:disable-next-line: deprecation
  | IntegerType
  | IntType
  | UnknownArrayType
  | UnknownRecordType
  | FunctionType
  | UnknownType
```

Added in v0.4.0

# Combinator (type alias)

**Signature**

```ts
export type Combinator =
  | InterfaceCombinator
  | UnionCombinator
  | LiteralCombinator
  | IntersectionCombinator
  | KeyofCombinator
  | ArrayCombinator
  | ReadonlyArrayCombinator
  | TupleCombinator
  | RecursiveCombinator
  | DictionaryCombinator
  | PartialCombinator
  | TaggedUnionCombinator
  | CustomCombinator
  | ExactCombinator
  | StrictCombinator
  | ReadonlyCombinator
  | BrandCombinator
```

Added in v0.4.0

# Graph (type alias)

**Signature**

```ts
export type Graph = { [key: string]: Vertex }
```

Added in v0.4.0

# Node (type alias)

**Signature**

```ts
export type Node = TypeReference | TypeDeclaration | CustomTypeDeclaration
```

Added in v0.4.0

# TypeReference (type alias)

**Signature**

```ts
export type TypeReference = BasicType | Combinator | Identifier
```

Added in v0.4.0

# Vertex (class)

**Signature**

```ts
export declare class Vertex {
  constructor(public id: string)
}
```

Added in v0.4.0

## afters (property)

**Signature**

```ts
afters: string[]
```

Added in v0.4.0

# arrayCombinator

**Signature**

```ts
export declare function arrayCombinator(type: TypeReference, name?: string): ArrayCombinator
```

Added in v0.4.0

# booleanType

**Signature**

```ts
export declare const booleanType: BooleanType
```

Added in v0.4.0

# brandCombinator

**Signature**

```ts
export declare function brandCombinator(
  type: TypeReference,
  predicate: (variableName: string) => string,
  name: string
): BrandCombinator
```

Added in v0.4.0

# customCombinator

**Signature**

```ts
export declare function customCombinator(
  staticRepr: string,
  runtimeRepr: string,
  dependencies: Array<string> = []
): CustomCombinator
```

Added in v0.4.0

# customTypeDeclaration

**Signature**

```ts
export declare function customTypeDeclaration(
  name: string,
  staticRepr: string,
  runtimeRepr: string,
  dependencies: Array<string> = []
): CustomTypeDeclaration
```

Added in v0.4.0

# exactCombinator

**Signature**

```ts
export declare function exactCombinator(type: TypeReference, name?: string): ExactCombinator
```

Added in v0.4.0

# functionType

**Signature**

```ts
export declare const functionType: FunctionType
```

Added in v0.4.0

# getNodeDependencies

**Signature**

```ts
export declare const getNodeDependencies: (node: Node) => string[]
```

Added in v0.4.0

# getRecursiveTypeDeclaration

**Signature**

```ts
export declare function getRecursiveTypeDeclaration(declaration: TypeDeclaration): TypeDeclaration
```

Added in v0.4.0

# getTypeDeclarationGraph

**Signature**

```ts
export declare function getTypeDeclarationGraph(declarations: Array<TypeDeclaration | CustomTypeDeclaration>): Graph
```

Added in v0.4.0

# getTypeDeclarationMap

**Signature**

```ts
export declare function getTypeDeclarationMap(
  declarations: Array<TypeDeclaration | CustomTypeDeclaration>
): { [key: string]: TypeDeclaration | CustomTypeDeclaration }
```

Added in v0.4.0

# identifier

**Signature**

```ts
export declare function identifier(name: string): Identifier
```

Added in v0.4.0

# intType

**Signature**

```ts
export declare const intType: IntType
```

Added in v0.4.0

# intersectionCombinator

**Signature**

```ts
export declare function intersectionCombinator(types: Array<TypeReference>, name?: string): IntersectionCombinator
```

Added in v0.4.0

# keyofCombinator

**Signature**

```ts
export declare function keyofCombinator(values: Array<string>, name?: string): KeyofCombinator
```

Added in v0.4.0

# literalCombinator

**Signature**

```ts
export declare function literalCombinator(value: string | boolean | number, name?: string): LiteralCombinator
```

Added in v0.4.0

# nullType

**Signature**

```ts
export declare const nullType: NullType
```

Added in v0.4.0

# numberType

**Signature**

```ts
export declare const numberType: NumberType
```

Added in v0.4.0

# partialCombinator

**Signature**

```ts
export declare function partialCombinator(properties: Array<Property>, name?: string): PartialCombinator
```

Added in v0.4.0

# printRuntime

**Signature**

```ts
export declare function printRuntime(node: Node, i: number = 0): string
```

Added in v0.4.0

# printStatic

**Signature**

```ts
export declare function printStatic(node: Node, i: number = 0, recursion?: Recursion): string
```

Added in v0.4.0

# property

**Signature**

```ts
export declare function property(
  key: string,
  type: TypeReference,
  isOptional: boolean = false,
  description?: string
): Property
```

Added in v0.4.0

# readonlyArrayCombinator

**Signature**

```ts
export declare function readonlyArrayCombinator(type: TypeReference, name?: string): ReadonlyArrayCombinator
```

Added in v0.4.0

# readonlyCombinator

**Signature**

```ts
export declare function readonlyCombinator(type: TypeReference, name?: string): ReadonlyCombinator
```

Added in v0.4.0

# recordCombinator

**Signature**

```ts
export declare function recordCombinator(
  domain: TypeReference,
  codomain: TypeReference,
  name?: string
): DictionaryCombinator
```

Added in v0.4.0

# recursiveCombinator

**Signature**

```ts
export declare function recursiveCombinator(
  typeParameter: Identifier,
  name: string,
  type: TypeReference
): RecursiveCombinator
```

Added in v0.4.0

# sort

**Signature**

```ts
export declare function sort(
  declarations: Array<TypeDeclaration | CustomTypeDeclaration>
): Array<TypeDeclaration | CustomTypeDeclaration>
```

Added in v0.4.0

# strictCombinator

**Signature**

```ts
export declare function strictCombinator(properties: Array<Property>, name?: string): StrictCombinator
```

Added in v0.4.0

# stringType

**Signature**

```ts
export declare const stringType: StringType
```

Added in v0.4.0

# taggedUnionCombinator

**Signature**

```ts
export declare function taggedUnionCombinator(
  tag: string,
  types: Array<TypeReference>,
  name?: string
): TaggedUnionCombinator
```

Added in v0.4.0

# tsort

topological sort

**Signature**

```ts
export declare function tsort(graph: Graph): { sorted: Array<string>; recursive: { [key: string]: true } }
```

Added in v0.4.0

# tupleCombinator

**Signature**

```ts
export declare function tupleCombinator(types: Array<TypeReference>, name?: string): TupleCombinator
```

Added in v0.4.0

# typeCombinator

**Signature**

```ts
export declare function typeCombinator(properties: Array<Property>, name?: string): InterfaceCombinator
```

Added in v0.4.0

# typeDeclaration

**Signature**

```ts
export declare function typeDeclaration(
  name: string,
  type: TypeReference,
  isExported: boolean = false,
  /** @deprecated */
  isReadonly: boolean = false,
  description?: string
): TypeDeclaration
```

Added in v0.4.0

# undefinedType

**Signature**

```ts
export declare const undefinedType: UndefinedType
```

Added in v0.4.0

# unionCombinator

**Signature**

```ts
export declare function unionCombinator(types: Array<TypeReference>, name?: string): UnionCombinator
```

Added in v0.4.0

# unknownArrayType

**Signature**

```ts
export declare const unknownArrayType: UnknownArrayType
```

Added in v0.4.0

# unknownRecordType

**Signature**

```ts
export declare const unknownRecordType: UnknownRecordType
```

Added in v0.4.0

# unknownType

**Signature**

```ts
export declare const unknownType: UnknownType
```

Added in v0.4.0

# ~~dictionaryCombinator~~

Use `recordCombinator` instead

**Signature**

```ts
export declare const dictionaryCombinator: typeof recordCombinator
```

Added in v0.4.0

# ~~integerType~~

**Signature**

```ts
export declare const integerType: IntegerType
```

Added in v0.4.0

# ~~interfaceCombinator~~

Use `typeCombinator` instead

**Signature**

```ts
export declare const interfaceCombinator: typeof typeCombinator
```

Added in v0.4.0
