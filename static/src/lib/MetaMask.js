import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from "web3";

const ethProvider = window.ethereum;
const web3 = new Web3(ethProvider);
const chains = {
    mainnet: 'mainnet',
    ropsten: 'ropsten',
    rinkeby: 'rinkeby',
    goerli: 'goerli',
    kovan: 'kovan',
    avalanche: 'avalanche',
    fuji: 'fuji'
};
const requiredChain = chains.avalanche;

const metaMaskInstalled = async () => await detectEthereumProvider();

async function initMetaMask(setAccounts, setChain) {
  if(! await metaMaskInstalled()) return false;
  ethProvider.on('accountsChanged', setAccounts);
  ethProvider.on('chainChanged', (id) => chainChanged(id, setChain));
  await ethProvider.request({ method: 'eth_accounts' }).then(setAccounts);
  await ethProvider.request({ method: 'eth_chainId' }).then((id) => chainChanged(id, setChain));
  return true;
}

function chainChanged(chainId, setChain) {
  const idToString = {
    '0x1': chains.mainnet,
    '0x3': chains.ropsten,
    '0x4': chains.rinkeby,
    '0x5': chains.goerli,
    '0x2a': chains.kovan,
    '0xa86a': chains.avalanche,
    '0xa869': chains.fuji
  }

  setChain(idToString[chainId]);
}

function connect() {
  if(!ethProvider) return;

  ethProvider.request({ method: 'eth_requestAccounts' })
  .catch((err) => console.error(err));
}

function switchChain(newChain) {
  const stringToId = {
    [chains.mainnet]: '0x1',
    [chains.ropsten]: '0x3',
    [chains.rinkeby]: '0x4',
    [chains.goerli]: '0x5',
    [chains.kovan]: '0x2a',
    [chains.avalanche]: '0xa86a',
    [chains.fuji]: '0xa869'
  }

  const chainId = stringToId[newChain];

  ethProvider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] })
  .catch((err) => console.error(err));
}

async function dispatchMethod(methodABI, txParams, onReceipt, onError, onTx = () => {}) {
  if(['view', 'pure'].includes(methodABI._method.stateMutability)) {
    methodABI.call(txParams).then(onReceipt).catch(onError);
  } else {
    const nonce = await web3.eth.getTransactionCount(txParams.from, "latest"); // get latest nonce
    txParams.nonce = nonce;

    methodABI.send(txParams)
    .on('transactionHash', onTx)
    .on('receipt', onReceipt)
    .on('error', onError);
  }
}

async function dispatchMethodAsync(methodABI, txParams) {
  if(['view', 'pure'].includes(methodABI._method.stateMutability)) {
    return await methodABI.call(txParams);
  } else {
    const nonce = await web3.eth.getTransactionCount(txParams.from, "latest"); // get latest nonce
    txParams.nonce = nonce;

    return await methodABI.send(txParams);
  }
}

export {
  initMetaMask,
  connect,
  chains,
  requiredChain,
  dispatchMethod,
  dispatchMethodAsync,
  web3,
  switchChain
}