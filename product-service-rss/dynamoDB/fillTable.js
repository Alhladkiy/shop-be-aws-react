const DynamoDB = require ('@aws-sdk/client-dynamodb');
const shopProducts = require('./products/shopProducts')
const PRODUCTS_TABLE = Products_table;

const createProductTable= async (dbClient) => {
  try {
    const tables = await dbClient.listTables({});
    if (tables.TableNames.includes(PRODUCTS_TABLE)) return true;

    const tableCreationResult = await dbClient.createTable({
      TableName: PRODUCTS_TABLE,
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      BillingMode: 'PROVISIONED',
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      StreamSpecification: {
        StreamEnabled: false,
      }
    });

    return tableCreationResult.$metadata.httpStatusCode === 200;
  } catch (err) {
    return false;
  }
};

const insertProducts = async (dbClient) => {
  try {
    const insertResult = await dbClient.batchWriteItem({
      RequestItems:
      {
        [PRODUCTS_TABLE]: shopProducts.map((product) => ({
          PutRequest: {
            Item: {
              id: { S: product.id },
              description: { S: product.description },
              imageSrc: { S: product.imageSrc },
              price: { N: `${product.price}` },
              title: { S: product.title },
            }
          }
        })),
      }
    });

    return Object.keys(insertResult.UnprocessedItems).length === 0;
  } catch (err) {
    return false;
  }
};

(async () => {
  const dbClient = new DynamoDB({ region: 'eu-west-1' });
  const isTableCreated = await createProductTable(dbClient);

  if (!isTableCreated) {
    return;
  }

  const areProductsInserted = await insertProducts(dbClient);

  if (!areProductsInserted) {
    return;
  }
})();