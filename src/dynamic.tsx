import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { TCustomField } from "@site/docusaurus.config";

export const useZKDatabaseCode = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { ZKDATABASE_GRAPHQL_ENDPOINT } = customFields;
  return `const zkdb = await ZkDatabase.connect({
    userName: "chiro-user",
    privateKey: "EKFTciRxyxshZjimay9sktsn7v5PvmC5zPq7q4JnitHUytxUVnFP",
    environment: "node",
    // This URL is for test environment
    url: "${ZKDATABASE_GRAPHQL_ENDPOINT}",
  });`;
};

export const EXAMPLE_COLLECTION_CREATE = `//Create new group for user chiro-user
await zkdb.db('zkdb_test').group('chiro').create({
  groupDescription: 'Test group',
});

// Define the schema for given collection
class Shirt extends Schema.create({
  name: CircuitString,
  price: UInt64,
}) {}

// Create a new collection with the defined schema
console.log(
  await zkdb.db('zkdb_test')
    .collection('test_collection')
    .create(
      Shirt,
      Permission.policyPrivate(),
      'chiro'
    )
);

console.log(await zkdb.db('zkdb_test').collection('test').create(Shirt));`;

export const EXAMPLE_DOCUMENT_INSERT = `class Shirt extends Schema.create({
  name: CircuitString,
  price: UInt64,
}) {}

type TShirt = typeof Shirt;

const collection = await zkdb
  .db('zkdb_test')
  .collection<TShirt>('test_collection');

await collection.insert({
  name: 'Test Shirt',
  price: 10n,
});

const document = await collection.insert(
  {
    name: 'Orochi',
    price: 10n ** 9n,
  },
  Permission.policyStrict()
);`;

export const EXAMPLE_DOCUMENT_UPDATE = `class Shirt extends Schema.create({
  name: CircuitString,
  price: UInt64,
}) {}

type TShirt = typeof Shirt;

const collection = await zkdb
  .db('zkdb_test')
  .collection<TShirt>('test_collection');

const doc = await collection.findOne({ name: 'Test Shirt' });

if (doc) {
  await doc.update({ price: 20n });
}`;

export const EXAMPLE_DOCUMENT_DROP = `const collection = await zkdb.db('zkdb_test').collection('test_collection');

const doc = await collection.findOne({ name: 'Test Shirt' });

if (doc) {
  await doc.drop();
}
`;

export const EXAMPLE_DOCUMENT_FIND = `class Shirt extends Schema.create({
  name: CircuitString,
  price: UInt64,
}) {}

type TShirt = typeof Shirt;

const collection = await zkdb
  .db('zkdb_test')
  .collection<TShirt>('test_collection');

const doc = await collection.findOne({ name: 'Test Shirt' });

if (doc) {
  console.log(doc.document);
}

const listDoc = await collection.findMany(undefined, { limit: 10, offset: 0 });

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
  const { code, auth, import: imp } = props;
  const ZKDATABASE_CODE = useZKDatabaseCode();
  const authenticated: boolean = auth ?? false;
  const imported = `${
    typeof props.import === "undefined"
      ? "import { ZkDatabase } from 'zkdb';"
      : props.import
  }\n\n`;
  const renderCode = authenticated
    ? `\n\nawait zkdb.auth.signIn();\n\n${code}\n\nawait zkdb.auth.signOut();\n`
    : `\n${code}\n`;
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
