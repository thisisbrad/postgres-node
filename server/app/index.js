const express = require('express');
const middlewares = require('./middlewares');
const routeHandler = require('./routes');

const app = express();
// attaches all middlewares to the app
middlewares(app);

// attaches all routes to the app
app.use('/', routeHandler());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found (${req.url})`);
  err.status = 404;
  next(err);
});

module.exports = app;
