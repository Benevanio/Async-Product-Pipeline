const producer = require('../queue/producer');
const Product = require('../model/products.model');

exports.processBatch = async (products) => {
  for (const product of products) {
    await producer.send(product);
  }
};

exports.getProducts = async (query) => {
  return Product.find(query);
};