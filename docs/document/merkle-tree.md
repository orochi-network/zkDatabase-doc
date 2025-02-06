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
document's status in the merkle tree by calling the `merkleProofStatus` method
on a `Document` object.

### Definition

```ts
await document.merkleProofStatus(): Promise<EQueueTaskStatus>;
```

### Parameters
- None

### Returns

The operation returns a `Promise` that resolves to the status of the document
in the merkle tree. The status can be one of the following:

- `EQueueTaskStatus.Queued`: The document has been queued for the next merkle
tree update.
- `EQueueTaskStatus.Processing`: The document is currently being processed for
the next merkle tree update.
- `EQueueTaskStatus.Success`: The document has been successfully processed and
incorporated into the merkle tree.
- `EQueueTaskStatus.Failed`: The document processing has failed and is not
included in the merkle tree. This status also indicates that subsequent
operations on the document will be blocked until corrective action is taken.
Refer to [Detect and retry failed operations](../zk-proof/prover-retry.mdx) for
more information on how to handle failure.
- `EQueueTaskStatus.Unknown`: The document's status cannot be determined. This
should only occur if there is an underlying issue with the zkDatabase.

### Example

<DatabaseExample
auth={true}
import={`import { CircuitString, UInt64 } from 'o1js';
import { Schema, ZkDatabase, Permission } from './index';
import { EQueueTaskStatus } from '@zkdb/common'`}
code={`${EXAMPLE_DOCUMENT_INSERT}

const status = await document.merkleProofStatus();
console.assert([
    EQueueTaskStatus.Queued,
    EQueueTaskStatus.Processing,
    EQueueTaskStatus.Success,
    EQueueTaskStatus.Failed,
    EQueueTaskStatus.Unknown,
].includes(status))`}
/>

## Get the merkle proof for a document

Once you've confirmed that the document's merkle tree proof status is
`Success`, you can retrieve its merkle proof using the `merkleProof` method on
the `Document` object. If the status is not `Success`, the merkle proof may
correspond to an empty node.

### Definition

```ts
await document.merkleProof(): Promise<TMerkleProof>;
```

### Parameters
- None

### Returns

The operation returns a `Promise` that resolves to the merkle proof for the
document. The merkle proof is a list of hashes that can be used to verify the
document's inclusion in the merkle tree.

```ts
type TMerkleProof = Array<{
    sibling: string;
    isLeft: boolean;
}>;
```

### Example

<DatabaseExample
auth={true}
import={`import { CircuitString, UInt64 } from 'o1js';
import { Schema, ZkDatabase, Permission } from './index';
import { EQueueTaskStatus } from '@zkdb/common'`}
code={`${EXAMPLE_DOCUMENT_INSERT}

let status;
while ((status = await document.merkleProofStatus()) !== EQueueTaskStatus.Success) {
    if (status === EQueueTaskStatus.Failed) {
        throw new Error('Document processing failed');
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
}

const proof = await document.merkleProof();
console.assert(proof.length > 0)`}
/>

