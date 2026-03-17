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

exports.send = (message) => {
  return new Promise((resolve, reject) => {
    stompit.connect(connectOptions, (error, client) => {
      if (error) return reject(error);

      const frame = client.send({ destination: '/queue/products' });
      frame.write(JSON.stringify(message));
      frame.end();

      client.disconnect();
      resolve();
    });
  });
};