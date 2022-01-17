const express = require('express');
const RebaseHistory = require('./rebase-history');
const router = express.Router();

router.get('/rebase_history/:address', RebaseHistory);

module.exports = router;
