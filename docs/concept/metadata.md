---
sidebar_position: 3
---

# Metadata

The **zkDatabase** metadata system manages essential information for both **collections** and **documents** within the database. This metadata ensures that data is structured, accessible, and verifiable, especially in the context of Zero-Knowledge Proofs (ZKPs) used for cryptographic integrity.

## Collection Metadata

**Collection metadata** contains details about a collection, including the name, description, schema, ownership, permissions, and additional attributes such as disk size.

### Key Fields in `TCollectionMetadata`:

1. **`collectionName`**: The name of the collection.
1. **`owner`**: The owner of the collection.
1. **`group`**: The group that share the same permission of the collection.
1. **`permission`**: This value is typically a `number` that encodes all the permissions as a bitmask. The individual bits represent whether specific permissions (e.g., read, write, delete) are enabled or disabled.
1. **`sizeOnDisk`**: The size of the collection in the database (MongoDB-specific).
1. **`schema`**: Defines the structure of the data within the collection, mapping fields to specific provable types used in zk-SNARKs for data verification.
1. **`createdAt`**: Timestamp when the collection was created.
1. **`updatedAt`**: Timestamp when the collection was last updated.

### **Provable Types in Schema**:

The schema is an important part of collection metadata, specifying how the fields of a collection should be structured. The fields are mapped to **provable types**, ensuring that data is compatible with Zero-Knowledge Proofs. A schema is typically defined as an array of `TSchemaSerializedFieldDefinition`. This array holds multiple field definitions, each specifying the field's `name` and `kind`.

```ts
[
  {
    name: "age",
    kind: "UInt32",
  },
  {
    name: "isActive",
    kind: "Bool",
  },
  {
    name: "username",
    kind: "CircuitString",
  },
];
```

### **Methods for Managing Collection Metadata:**

- **`info()`**: Retrieves metadata for the collection, including the name, creation and update timestamps, schema, and ownership.
- **`groupSet(groupName: string)`**: Associates a group with the collection.
- **`ownerSet(userName: string)`**: Sets or updates the owner of the collection.
- **`permissionSet(permission: Permission)`**: Sets the permissions for the collection (e.g., read, write, delete).
- **`permissionGet()`**: Retrieves the current permissions associated with the collection.

## **Document Metadata**

**Document metadata** includes detailed information about individual documents within a collection. This metadata is essential for managing document-level attributes, ensuring data integrity, and handling access control.

### **Key Fields in `TDocumentMetadata`:**

1. **`collectionName`**: The name of the collection.
1. **`docId`**: The unique identifier for the document.
1. **`merkleIndex`**: A Merkle index is the index of the document in a Merkle tree, which is crucial for efficient data retrieval and validation.
1. **`owner`**: The owner of the collection.
1. **`group`**: The group that share the same permission of the collection.
1. **`permission`**: This value is typically a `number` that encodes all the permissions as a bitmask. The individual bits represent whether specific permissions (e.g., read, write, delete) are enabled or disabled.
1. **`sizeOnDisk`**: The size of the collection in the database (MongoDB-specific).
1. **`schema`**: Defines the structure of the data within the collection, mapping fields to specific provable types used in zk-SNARKs for data verification.
1. **`createdAt`**: Timestamp when the collection was created.
1. **`updatedAt`**: Timestamp when the collection was last updated.

### **Methods for Managing Document Metadata:**

- **`info()`**: Retrieves the metadata for the document, including its ID, collection name, creation timestamp, and ownership details.
- **`groupSet(groupName: string)`**: Associates a group with the document.
- **`ownerSet(userName: string)`**: Sets or updates the owner of the document.
- **`permissionSet(permission: Permission)`**: Sets the permissions for the document (e.g., read, write, delete).
- **`permissionGet()`**: Retrieves the current permissions associated with the document.
