---
title: Referenceable.ts
nav_order: 3
parent: Modules
---

# Referenceable overview

Added in v0.4.4

---

<h2 class="text-delta">Table of contents</h2>

- [Referenceable (interface)](#referenceable-interface)

---

# Referenceable (interface)

**Signature**

```ts
export interface Referenceable<URI extends URIS>
  extends S.WithUnknownContainers1<URI>,
    S.WithUnion1<URI>,
    S.Schemable1<URI> {
  readonly reference: (id: string) => Kind<URI, unknown>
}
```

Added in v0.4.4
