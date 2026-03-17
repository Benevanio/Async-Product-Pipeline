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

let isRunning = false;

async function processMessage(body) {
  const data = JSON.parse(body);
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;

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
}

function consumeForWindow(windowMs = 30000) {
  if (isRunning) {
    console.log('Consumer is already running, skipping this cycle.');
    return Promise.resolve();
  }

  isRunning = true;

  return new Promise((resolve, reject) => {
    stompit.connect(connectOptions, (err, client) => {
      if (err) {
        isRunning = false;
        return reject(err);
      }

      const headers = {
        destination: '/queue/products',
        ack: 'auto'
      };

      const subscription = client.subscribe(headers, async (error, message) => {
        if (error) {
          console.error(error);
          return;
        }

        message.readString('utf-8', async (readErr, body) => {
          if (readErr) {
            console.error(readErr);
            return;
          }

          try {
            await processMessage(body);
          } catch (processErr) {
            console.error(processErr);
          }
        });
      });

      setTimeout(() => {
        try {
          subscription.unsubscribe();
        } catch (unsubscribeErr) {
          console.error(unsubscribeErr);
        }

        client.disconnect();
        isRunning = false;
        resolve();
      }, windowMs);
    });
  });
}

module.exports = {
  consumeForWindow
};

if (require.main === module) {
  consumeForWindow().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}