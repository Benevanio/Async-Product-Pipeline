const cron = require('node-cron');
const Product = require('../model/products.model');
const producer = require('../queue/producer');

cron.schedule('*/1 * * * *', async () => {
  console.log('Running retry job...');

  const failed = await Product.find({
    status: 'ERROR',
    retries: { $lt: 3 }
  });

  for (const product of failed) {
    await producer.send(product);

    product.retries += 1;
    await product.save();
  }
});