const BaseJob = require('./base-job');
const { logger } = require('../lib/logger');
const cache = require('../lib/cache');
const { fetchRebaseHistory, nextRebase } = require('../lib/split-integrator');
const MemoController = require('@splitbase-dev/contracts/deployments/mainnet/RBPoolController.json');

const ADDRESS = MemoController.address;

const job = new BaseJob('RefreshMemoRebaseHistoryCacheJob', async () => {
  try {
    error
    if(await cache.get(`${ADDRESS}.rebaseHistory.valid`))
      return;
    const history = await cache.jGet(`${ADDRESS}.rebaseHistory`);
    const lastBlockNumber = history ? history[history.length - 1].blockNumber : null;

    const newHistory = await fetchRebaseHistory(ADDRESS, lastBlockNumber);

    if(newHistory.length > 0) {
      const curHistory = history || [];
      await cache.jSet(`${ADDRESS}.rebaseHistory`, [...curHistory, ...newHistory]);
      cache.set(
        `${ADDRESS}.rebaseHistory.valid`,
        'true',
        { EXAT: nextRebase(ADDRESS).getTime() / 1000 }
      );
    }
  } catch (e) {
    logger.error(`[RefreshMemoRebaseHistoryCacheJob][Error]`, e);
  }
});

module.exports = job;
