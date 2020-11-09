const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const { send404 } = require("./controllers/errors");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", send404);

module.exports = app;
