const express = require('express');
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(routes);
app.use(errorMiddleware);

module.exports = app;
