const stompit = require('stompit');

const connectOptions = {
  host: 'localhost',
  port: 61613,
  connectHeaders: {
    host: '/',
    login: 'admin',
    passcode: 'admin'
  }
};

function sanitizeMessage(message) {
  const payload = message && typeof message.toObject === 'function'
    ? message.toObject()
    : { ...message };

  delete payload._id;
  delete payload.__v;
  delete payload.createdAt;
  delete payload.updatedAt;

  return payload;
}

exports.send = (message) => {
  return new Promise((resolve, reject) => {
    stompit.connect(connectOptions, (error, client) => {
      if (error) return reject(error);

      const frame = client.send({ destination: '/queue/products' });
      frame.write(JSON.stringify(sanitizeMessage(message)));
      frame.end();

      client.disconnect();
      resolve();
    });
  });
};