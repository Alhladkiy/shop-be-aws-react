const { products } = require('../mock/products');

module.exports.getProductsById = async (event) => {

    const productId = event.pathParameters.productId;
    const product = products.find((item) => {
        return item.id === productId;
    })
    if(!product) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: `Cannot find product with id ${productId}`,
            code: 404
          }),
        }
    };

    return {
          statusCode: 200,
          body: JSON.stringify(product),
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET"
          },
      };
}