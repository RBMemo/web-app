const BaseJob = require('./base-job');
const cache = require('../lib/cache');
const { nextRebase } = require('../lib/split-integrator');
const MemoController = require('@splitbase-dev/contracts/deployments/mainnet/RBPoolController.json');

const ADDRESS = MemoController.address;

const job = new BaseJob('RefreshMemoRebaseHistoryCacheJob', async () => {
  if(await cache.get(`${ADDRESS}.rebaseHistory.valid`))
    return;

  let curHistory = await cache.jGet(`${ADDRESS}.rebaseHistory`);
  const lastBlockNumber = curHistory ? curHistory[curHistory.length - 1].blockNumber : null;

  const newHistory = await fetchRebaseHistory(ADDRESS, lastBlockNumber);

  if(newHistory.length > 0) {
    curHistory ||= [];
    await cache.jSet(`${ADDRESS}.rebaseHistory`, [...curHistory, ...newHistory]);
    cache.set(
      `${ADDRESS}.rebaseHistory.valid`,
      'true',
      { EXAT: nextRebase(ADDRESS).getTime() / 1000 }
    );
  }
});

module.exports = job;
