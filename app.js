const express = require('express');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
require('./src/jobs/product.job');

const app = express();

connectDB();

app.use(express.json());
app.use('/products', productRoutes);

module.exports = app;