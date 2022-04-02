const express = require('express');

const { globalErrorHandler } = require('./controllers/error-controller');

const { usersRouter } = require('./routes/users-routes');
const { productRouter } = require('./routes/products-routes');
const { cartRouter } = require('./routes/cart-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);

app.use(globalErrorHandler);

module.exports = { app };
