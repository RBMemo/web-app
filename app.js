const express = require('express');
const router = require('./routes');
const { logger, trafficLogger, errorLogger } = require('./lib/logger');
const app = express();

// logging middleware
app.use(trafficLogger);

// body parsing middleware
app.use(express.json({extended: false}));
// app.use(express.urlencoded({ extended: true }));

// app routes
app.use(router);

// error logging
app.use(errorLogger);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server started on port: ${port}`);
});
