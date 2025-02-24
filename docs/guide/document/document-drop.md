---
sidebar_position: 3
---


import { DatabaseExample, EXAMPLE_DOCUMENT_DROP } from "@site/src/dynamic";

# Drop Document


To drop an document you need to retrieve a specific document from a collection first then delete it. This is particularly useful for managing or cleaning up data.

### Definition

Each instance of `Document` has a method called `drop()`, which can be used to delete the document from the database.

```ts
await document.drop();
```

### Parameters

- None

### Returns

The operation returns a `Promise` that resolves to the deletion acknowledgment in `boolean`.

### Example

This example shows how to connect to a zkDatabase, authenticate, retrieve a document by its name, and delete it using the `drop` method.

<DatabaseExample
auth={true}
code={EXAMPLE_DOCUMENT_DROP}
/>