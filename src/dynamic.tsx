import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { TCustomField } from "@site/docusaurus.config";

export const useZKDatabaseCode = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { ZKDATABASE_GRAPHQL_ENDPOINT } = customFields;
  return `const zkdb = new ZkDatabase({
  apiKey: 'your-api-key',
  url: '${ZKDATABASE_GRAPHQL_ENDPOINT}',
});`;
};

export const EXAMPLE_COLLECTION_CREATE = `// Define the schema for given collection
const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const dbTest = zkdb.db('zkdb_test');

// Ensure group exists
const group = dbTest.group('chiro');
if (!(await group.exist()).unwrapOr(false)) {
  (await group.create({ groupDescription: 'Test group' })).unwrap();
}

// Define permissions
const permissions = Permission.from({
  owner: { read: true, write: true, delete: true, system: true },
  group: { read: true, write: true, delete: false, system: false },
  other: { read: true, write: false, delete: false, system: false },
});

// Create a new collection with the defined schema
const result = await dbTest.collection<TShirt>('test_collection').create(
  ShirtSchema,
  permissions,
  'chiro'
);

if (result.isOk()) {
  console.log('Collection created');
} else {
  console.log('Error:', result.unwrapErr().message);
}`;

export const EXAMPLE_DOCUMENT_INSERT = `const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const collection = zkdb.db('zkdb_test').collection<TShirt>('test_collection');

const docId1 = (await collection.insert({
  name: 'Test Shirt',
  price: 10n,
})).unwrap();
console.log('Inserted:', docId1);

const docId2 = (await collection.insert({
  name: 'Orochi',
  price: 10n ** 9n,
})).unwrap();
console.log('Inserted:', docId2);`;

export const EXAMPLE_DOCUMENT_UPDATE = `const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const collection = zkdb.db('zkdb_test').collection<TShirt>('test_collection');

const docs = (await collection.findMany({ name: 'Test Shirt' })).unwrap();

if (docs.data.length > 0) {
  const doc = docs.data[0];
  (await doc.update({ price: 20n })).unwrap();
  console.log('Updated successfully');
}`;

export const EXAMPLE_DOCUMENT_DROP = `const collection = zkdb.db('zkdb_test').collection('test_collection');

const docs = (await collection.findMany({ name: 'Test Shirt' })).unwrap();

if (docs.data.length > 0) {
  const doc = docs.data[0];
  const dropResult = await doc.drop();
  if (dropResult.isOk()) {
    console.log('Deleted successfully');
  }
}`;

export const EXAMPLE_DOCUMENT_FIND = `const ShirtSchema = new Schema([
  { name: 'name', kind: 'CircuitString' },
  { name: 'price', kind: 'UInt64' },
]);

type TShirt = SchemaToObject<ReturnType<typeof ShirtSchema.schemaDefinition>>;

const collection = zkdb.db('zkdb_test').collection<TShirt>('test_collection');

// Find one document
const doc = (await collection.findOne({ name: 'Test Shirt' })).unwrap();

if (doc) {
  console.log(doc.document);
}

// Find many documents with pagination
const listDoc = (await collection.findMany({}, { limit: 10, offset: 0 })).unwrap();

listDoc.data.forEach((item) => {
  console.log(item.document);
});`;

export function DatabaseGuiLink() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { ZKDATABASE_GUI } = customFields as TCustomField;
  return (
    <Link
      href={ZKDATABASE_GUI}
      target="_blank"
      rel="zkDatabase Management tool"
    >
      zkDatabase Management tool
    </Link>
  );
}

export function DatabaseExample(props) {
  const { code } = props;
  const ZKDATABASE_CODE = useZKDatabaseCode();
  const imported = `${
    typeof props.import === "undefined"
      ? "import { Schema, SchemaToObject } from '@zkdb/common';\nimport { ZkDatabase, Permission } from 'zkdb';"
      : props.import
  }\n\n`;
  const renderCode = `\n${code}\n`;
  return (
    <div>
      <CodeBlock language="typescript">
        {imported}
        {ZKDATABASE_CODE}
        {renderCode}
      </CodeBlock>
    </div>
  );
}
