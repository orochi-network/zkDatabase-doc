---
sidebar_position: 3
---


import { DatabaseExample, EXAMPLE_DOCUMENT_DROP } from "@site/src/dynamic";

# Drop Document


To drop a document you need to retrieve it from a collection first then delete it. This is particularly useful for managing or cleaning up data.

### Definition

Each document instance has a method called `drop()`, which can be used to delete the document from the database.

```ts
const dropResult = await document.drop();
if (dropResult.isOk()) {
  console.log('Deleted successfully');
}
```

### Parameters

- None

### Returns

The operation returns a `Result` that can be checked with `.isOk()` / `.isErr()`.

### Example

This example shows how to retrieve a document by its name and delete it using the `drop` method.

<DatabaseExample
code={EXAMPLE_DOCUMENT_DROP}
/>