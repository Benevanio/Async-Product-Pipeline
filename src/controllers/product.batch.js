const productService = require('../services/product.service');

exports.createBatch = async (req, res) => {
  const products = req.body;

  await productService.processBatch(products);

  res.status(202).json({
    message: 'Products sent to queue'
  });
};

exports.getAll = async (req, res) => {
  const products = await productService.getProducts(req.query);
  res.json(products);
};