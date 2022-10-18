module.exports.catalogBatchProcess = async (event) => {
    const products = event.Records.map(({ body }) => body);
    console.log('products:', products)
};
