const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerFile = require('./docs/swagger_file.json');
const apiV1 = require('./api/v1/routes');
const router = express.Router();

router.use(express.static('static/build'));
router.use('/api/v1', apiV1);
router.get('/health', (_, res) => { /* #swagger.ignore = true */ res.status(200).json({ message: 'healthy' }) });

// dev only
if(process.env.NODE_ENV !== 'production') {
  router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

module.exports = router;
