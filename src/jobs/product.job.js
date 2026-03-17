const cron = require('node-cron');
const Product = require('../model/products.model');
const producer = require('../queue/producer');
const { consumeForWindow } = require('../queue/consumer');

cron.schedule('*/10 * * * *', async () => {
  console.log('Running retry and consume job...');

  try {
    await consumeForWindow();
  } catch (err) {
    console.error('Consumer cycle failed:', err);
  }

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