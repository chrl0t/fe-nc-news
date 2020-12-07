const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routers/api-router');
const {
  send404,
  handleInternalErrors,
  customErrorHandler,
  clientErrorHandler,
  PSQLErrorHandler,
  clientErrorMissingInfo,
  clientErrorUsedUsername
} = require('./controllers/errors');

app.use(cors());

app.use(express.json());
app.use('/api', apiRouter);

app.use(clientErrorHandler);
app.use(clientErrorMissingInfo);
app.use(clientErrorUsedUsername);
app.use(PSQLErrorHandler);
app.use(customErrorHandler);
app.use(handleInternalErrors);

app.all('/*', send404);

module.exports = app;
