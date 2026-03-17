
module.exports = {
  host: 'localhost',       // endereço do ActiveMQ
  port: 61613,             // porta STOMP (usada pelo node)
  login: 'admin',          // usuário padrão
  passcode: 'admin',       // senha padrão
  queue: '/queue/products' // fila que será usada no projeto
};