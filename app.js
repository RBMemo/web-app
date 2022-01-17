require('dotenv').config();
const express = require('express');
const compression = require('compression');
const router = require('./routes');
const { logger, trafficLogger, errorLogger } = require('./lib/logger');
const cache = require('./lib/cache');
const app = express();

// logging middleware
app.use(trafficLogger);

// body parsing middleware
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }));

app.use(compression());

// app routes
app.use(router);

// error logging
app.use(errorLogger);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server started on port: ${port}`);
  cache.connect();
});
