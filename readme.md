# Async Product Pipeline

Sistema de processamento assincrono de produtos em lote com Node.js, ActiveMQ e MongoDB.

## Exemplo 

<img width="1510" height="538" alt="Image" src="https://github.com/user-attachments/assets/95d580c8-8461-48e9-af77-75d7f78952b7" />


<img width="1671" height="634" alt="Image" src="https://github.com/user-attachments/assets/87c7e12f-03ec-4946-b2af-5e503078cd5c" />
<img width="1524" height="403" alt="image" src="https://github.com/user-attachments/assets/5c6814e1-63bf-43b5-8a56-8815dc123827" />

<img width="1089" height="896" alt="Image" src="https://github.com/user-attachments/assets/bd7b4e42-887d-45bf-b054-db2a1d47a624" />

<img width="997" height="940" alt="Image" src="https://github.com/user-attachments/assets/1d76db3a-0603-4c04-80d1-03a55bf67e26" />
<img width="1486" height="443" alt="Image" src="https://github.com/user-attachments/assets/5069301b-3736-4005-8ea1-91019fdc8f3a" />

<img width="1454" height="551" alt="Image" src="https://github.com/user-attachments/assets/0d572a00-eb86-49d3-af16-e633b86ef6e8" />



## Visao Geral

Fluxo do projeto:

Cliente -> API (Controller) -> Service -> Producer -> ActiveMQ -> Consumer -> MongoDB

## Requisitos

- Node.js 18+
- MongoDB em execucao
- ActiveMQ em execucao (STOMP em `61613`)

## Configuracao

Crie o arquivo `.env` na raiz do projeto com:

```env

PORT=3000
MONGO_URI= tua string de conexão com o MongoDB
STOMP_HOST=localhost
STOMP_PORT=61613
STOMP_USER=admin
STOMP_PASS=admin

```

## Como Rodar

1. Instale as dependencias:

```bash
npm install
```

2. Suba API + consumer com um comando:

```bash
npx concurrently "npm start" "node src/queue/consumer.js"
```

Alternativa (dois terminais):

```bash
npm start
```

```bash
node src/queue/consumer.js
```

## Endpoints

- `POST /products/batch` envia produtos para a fila
- `GET /products` lista produtos

Exemplo de request:

```bash
curl -X POST http://localhost:3000/products/batch \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "Produto A",
      "description": "Descricao A",
      "price": 10,
      "imageUrl": "https://exemplo.com/a.jpg"
    },
    {
      "name": "Produto B",
      "description": "Descricao B",
      "price": -5,
      "imageUrl": "https://exemplo.com/b.jpg"
    }
  ]'
```



```bash
curl --location 'http://localhost:3000/products' \
--header 'Content-Type: application/json'
```
