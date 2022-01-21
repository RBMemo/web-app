const { fetchRebaseHistory, nextRebase, isController } = require('../../lib/split-integrator');
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
  const { limit } = req.query;

  if(!isController(address)) {
    res.status(400).json({ message: 'address is not a controller' });
    return;
  }

  let history = await cache.jGet(`${address}.rebaseHistory`);
  if(!history) {
    await updateHistoryCache(address);
    history = await cache.jGet(`${address}.rebaseHistory`);
  }

  if(limit && limit < history.length) {
    history = history.slice(history.length - limit, history.length);
  }

  res.status(200).json(history);
 
  updateHistoryCache(
    address,
    history.length > 0 ? history[history.length - 1].blockNumber : null
  );
};

module.exports = RebaseHistory;
