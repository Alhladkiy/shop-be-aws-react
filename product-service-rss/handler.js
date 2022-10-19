'use strict';

const { getProductsList } = require('./handlers/getProductsList'); 
const { getProductsById } = require('./handlers/getProductsById'); 
const { catalogBatchProcess } = require('./handlers/catalogBatchProcess');

module.exports.getProductsList = getProductsList;

module.exports.getProductsById = getProductsById;

module.exports.catalogBatchProcess = catalogBatchProcess;
