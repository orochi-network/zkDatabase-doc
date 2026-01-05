---
sidebar_position: 4
---

# Schema

The `Schema` class in zkDatabase represents a database document structure that can be used in zero-knowledge circuits. It provides functionality for serialization, deserialization, and hashing of documents, ensuring that all documents are compatible with zkDatabase's Groth16 proof system.

## Key Concepts of Schema

1. **Structured Documents**:

- The Schema class defines documents with specific fields and their types, ensuring that each document adheres to a defined structure.

- This ensures that all documents created within zkDatabase are compatible with zero-knowledge proof systems, allowing them to be serialized, deserialized, and hashed securely.

2. **Provable Types**:

- The schema supports provable types—data types that can be used in cryptographic proofs. These types include `CircuitString`, `UInt32`, `UInt64`, `Bool`, `Int64`, and `Field`.

- By restricting documents to provable types, zkDatabase ensures that all data stored is compatible with the cryptographic protocols used for zero-knowledge proofs.

### Supported Provable Types in zkDatabase

The supported provable types are as follows:

- **CircuitString**: A string type that can be used in ZK circuits.
- **UInt32**, **UInt64**: Unsigned integers of 32 and 64 bits.
- **Int64**: Signed 64-bit integer.
- **Bool**: Boolean value (true/false).
- **Field**: Represents a finite field element used in zk circuits.

### Creating a Schema

To define a document schema in zkDatabase, you use the `Schema` class from `@zkdb/common`. You create a schema by providing an array of field definitions, each specifying the field name and its type.

**Example: Creating a Schema for a Document**

```ts
import { Schema, SchemaToObject } from "@zkdb/common";

const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

// TypeScript type for the schema
type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;
```

In this example, the `ShirtSchema` defines a document with two fields: `name` (a `CircuitString`) and `price` (a `UInt64`). These fields are provable types, ensuring compatibility with zkDatabase's proof system.

### Available Field Types

When defining a schema, you can use the following `kind` values:

- `'CircuitString'`: A string type that can be used in ZK circuits.
- `'UInt32'`, `'UInt64'`: Unsigned integers of 32 and 64 bits.
- `'Int64'`: Signed 64-bit integer.
- `'Bool'`: Boolean value (true/false).
- `'Field'`: Represents a finite field element used in zk circuits.

### Working with Documents

Documents inserted using the schema can be retrieved and manipulated. The zkDatabase SDK handles serialization and deserialization automatically.

#### Inserting a Document

```ts
import { Schema, SchemaToObject } from "@zkdb/common";
import { ZkDatabase } from "zkdb";

const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const zkdb = new ZkDatabase({
  apiKey: 'your-api-key',
  url: 'https://test-serverless.zkdatabase.org/graphql',
});

const collection = zkdb.db('my_db').collection<TShirt>('shirts');

// Insert a document
const docId = (await collection.insert({
  name: 'Orochi',
  price: 12n,
})).unwrap();

console.log('Inserted document ID:', docId);
```

#### Finding a Document

```ts
// Find a document
const doc = (await collection.findOne({ name: 'Orochi' })).unwrap();

if (doc) {
  console.log('Found:', doc.document);
}
```

## Summary

The `Schema` class in zkDatabase provides a robust method for defining, managing, and securing documents using provable types. With support for serialization, deserialization, and hashing, the schema system ensures that all data stored in zkDatabase is ready for use with zero-knowledge proofs.
