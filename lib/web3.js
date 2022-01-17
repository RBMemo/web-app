const Web3 = require('web3');

const AVAX_URL = 'https://api.avax.network/ext/bc/C/rpc';

function connect() {
  return new Web3(AVAX_URL);
}

async function dispatchMethod(web3, methodABI, txParams) {
  if(['view', 'pure'].includes(methodABI._method.stateMutability)) {
    return await methodABI.call(txParams);
  } else {
    const nonce = await web3.eth.getTransactionCount(txParams.from, "latest"); // get latest nonce
    txParams.nonce = nonce;

    return await methodABI.send(txParams);
  }
}

async function getPastLogs(web3, address, topics, dataTypes, fromBlock = 'latest', toBlock = 'latest') {
  const logs = await web3.eth.getPastLogs({
    address,
    topics,
    fromBlock,
    toBlock
  });

  return logs.map(log => {
    log.topics.shift();
    return {
      ...web3.eth.abi.decodeLog(dataTypes, log.data, log.topics),
      blockNumber: log.blockNumber
    };
  });
}

module.exports = {
  connect,
  dispatchMethod,
  getPastLogs
}
