---
sidebar_position: 5
---


import { DatabaseExample, EXAMPLE_DOCUMENT_INSERT } from "@site/src/dynamic";

# Merkle Tree

After obtaining a `Document` instance, you can utilize these methods to examine
and verify the current state of the merkle tree.

## Get the merkle proof status for a document

After performing a document-related operation (create, update, or drop), the
document must be queued for the next merkle tree update. You can verify the
document's status in the merkle tree by calling the `proofStatus` method
on a document object.

### Definition

```ts
const status = (await document.proofStatus()).unwrap();
```

### Parameters
- None

### Returns

The operation returns a `Result` that resolves to the status of the document
in the merkle tree. The status can be one of the following:

- `Queued`: The document has been queued for the next merkle tree update.
- `Processing`: The document is currently being processed for the next merkle tree update.
- `Success`: The document has been successfully processed and incorporated into the merkle tree.
- `Failed`: The document processing has failed and is not included in the merkle tree.
- `Unknown`: The document's status cannot be determined.

### Example

<DatabaseExample
import={`import { Schema, SchemaToObject } from '@zkdb/common';
import { ZkDatabase, Permission } from 'zkdb';`}
code={`const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const collection = zkdb.db('zkdb_test').collection<TShirt>('test_collection');

// Find a document
const doc = (await collection.findOne({ name: 'Test Shirt' })).unwrap();

if (doc) {
  // Check proof status
  const status = (await doc.proofStatus()).unwrap();
  console.log('Proof status:', status);
}`}
/>

## Get the merkle proof for a document

Once you've confirmed that the document's merkle tree proof status is
`Success`, you can retrieve its merkle proof using the `merkleProof` method on
the document object.

### Definition

```ts
const proof = (await document.merkleProof()).unwrap();
```

### Parameters
- None

### Returns

The operation returns a `Result` that resolves to the merkle proof for the
document. The merkle proof contains the root hash and sibling information.

### Example

<DatabaseExample
import={`import { Schema, SchemaToObject } from '@zkdb/common';
import { ZkDatabase, Permission } from 'zkdb';`}
code={`const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const collection = zkdb.db('zkdb_test').collection<TShirt>('test_collection');

// Find a document
const doc = (await collection.findOne({ name: 'Test Shirt' })).unwrap();

if (doc) {
  // Get merkle proof
  const proof = (await doc.merkleProof()).unwrap();
  console.log('Merkle root:', proof.root);
}`}
/>

