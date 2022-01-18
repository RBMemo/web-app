const express = require('express');
const RebaseHistory = require('./rebase-history');
const PoolTotalSupply = require('./pool-total-supply');
const router = express.Router();

router.get('/rebase_history/:address', RebaseHistory);
router.get('/pool_total_supply/:address', PoolTotalSupply);

module.exports = router;
