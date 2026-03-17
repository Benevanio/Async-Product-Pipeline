# Async Product Pipeline

Sistema de processamento assincrono de produtos em lote com Node.js, ActiveMQ e MongoDB.

## Exemplo 

<img width="1510" height="538" alt="Image" src="https://github.com/user-attachments/assets/95d580c8-8461-48e9-af77-75d7f78952b7" />


<img width="1089" height="896" alt="Image" src="https://github.com/user-attachments/assets/bd7b4e42-887d-45bf-b054-db2a1d47a624" />



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
MONGO_URI=mongodb://127.0.0.1:27017/cronflow
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
