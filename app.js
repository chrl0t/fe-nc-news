const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const {
  send404,
  handleInternalErrors,
  customErrorHandler,
} = require('./controllers/errors');

app.use(express.json());
app.use('/api', apiRouter);

app.use(customErrorHandler);
app.use(handleInternalErrors);

app.all('/*', send404);

module.exports = app;
