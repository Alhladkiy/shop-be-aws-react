const { products } = require('../mock/products');

module.exports.getProductsList = async (event) => {

    return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET"
        },
  };
}