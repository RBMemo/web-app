const CronParser = require('cron-parser');
const { connect, getPastLogs } = require('./web3');
const PoolControllerABI = require('@splitbase-dev/contracts/deployments/mainnet/RBPoolController.json').abi;

const REBASE_TOPIC = '0x5899dee610fd5140296c7bd89bd352c8236705b7339a1078727dc830db7019e5';
const CONSTRUCT_BLOCKS = {
  '0x8e655B09328eef11d28695B45135bdeb488Fac2C': 9361827
};
const REBASE_CRONS = {
  '0x8e655B09328eef11d28695B45135bdeb488Fac2C': '0 6,14,22 * * *'
}

async function fetchRebaseHistory(address, fromBlock) {
  const web3 = connect();
  const rebaseLogStruct = PoolControllerABI.find(item => item.name === 'LogRebase').inputs;

  return await getPastLogs(
    web3,
    address,
    [REBASE_TOPIC],
    rebaseLogStruct,
    fromBlock || CONSTRUCT_BLOCKS[address]
  );
}

function nextRebase(address) {
  return CronParser.parseExpression(REBASE_CRONS[address]).next().toDate();
}

module.exports = {
  fetchRebaseHistory,
  nextRebase
}
