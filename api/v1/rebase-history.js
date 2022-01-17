const { fetchRebaseHistory, nextRebase } = require('../../lib/controller-integrator');
const cache = require('../../lib/cache');

async function updateHistoryCache(address, lastBlockNumber) {
  if(await cache.get(`${address}.rebaseHistory.valid`))
    return;

  const newHistory = await fetchRebaseHistory(
    address,
    lastBlockNumber ? lastBlockNumber + 1 : null
  );

  if(newHistory.length > 0) {
    const curHistory = await cache.jGet(`${address}.rebaseHistory`) || [];
    await cache.jSet(`${address}.rebaseHistory`, [...curHistory, ...newHistory]);
    cache.set(
      `${address}.rebaseHistory.valid`,
      'true',
      { EXAT: nextRebase(address).getTime() / 1000 }
    );
  }
}

async function RebaseHistory(req, res) {
  // #swagger.tags = ['v1']
  // #swagger.description = 'Returns history of rebases for specified controller address'

  const { address } = req.params;
  const { historyLength } = req.query;

  let history = await cache.jGet(`${address}.rebaseHistory`);
  if(!history) {
    await updateHistoryCache(address);
    history = await cache.jGet(`${address}.rebaseHistory`);
  }

  if(historyLength && historyLength < history.length) {
    history = history.slice(history.length - historyLength, history.length);
  }

  res.status(200).json(history);
 
  updateHistoryCache(
    address,
    history.length > 0 ? history[history.length - 1].blockNumber : null
  );
};

module.exports = RebaseHistory;
