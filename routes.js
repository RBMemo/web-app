const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger_file.json');
const express = require('express');
const router = express.Router();

router.get('/health', (_, res) => { /* #swagger.ignore = true */ res.status(200).json({ message: 'healthy' }) });
router.use(express.static('web/build'));

// dev only
if(process.env.NODE_ENV !== 'production') {
  router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

module.exports = router;
