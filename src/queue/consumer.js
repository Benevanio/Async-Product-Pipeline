const stompit = require('stompit');
const Product = require('../model/products.model');

const connectOptions = {
  host: 'localhost',
  port: 61613,
  connectHeaders: {
    host: '/',
    login: 'admin',
    passcode: 'admin'
  }
};

stompit.connect(connectOptions, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  const headers = {
    destination: '/queue/products',
    ack: 'auto'
  };

  client.subscribe(headers, async (error, message) => {
    if (error) return console.error(error);

    message.readString('utf-8', async (err, body) => {
      const data = JSON.parse(body);

      try {
        if (data.price <= 0) throw new Error('Invalid price');

        await Product.create({
          ...data,
          status: 'SUCCESS'
        });

      } catch (e) {
        await Product.create({
          ...data,
          status: 'ERROR'
        });
      }
    });
  });
});