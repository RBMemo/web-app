const { poolTotalSupply } = require('../../lib/split-integrator');
const cache = require('../../lib/cache');

async function PoolTotalSupply(req, res) {
  // #swagger.tags = ['v1']
  // #swagger.description = 'Returns total supply of pool at specified pool address'

  const { address } = req.params;

  let supply = await cache.get(`${address}.totalSupply`);
  if(!supply) {
    supply = await poolTotalSupply(address);
    cache.set(`${address}.totalSupply`, supply, { EX: 30 });
  }

  res.status(200).json(supply);
};

module.exports = PoolTotalSupply;
