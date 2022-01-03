import Web3 from 'web3';
import { dispatchMethodAsync } from './MetaMask';
import RedMemoPool from './contracts/MemoPool/RedMemoPool.json';
import BlackMemoPool from './contracts/MemoPool/BlackMemoPool.json';
// import RBPoolController from './contracts/MemoPool/RBPoolController.json';

const ethProvider = window.ethereum;
const web3 = new Web3(ethProvider);

const RedABI = new web3.eth.Contract(RedMemoPool.abi, RedMemoPool.address);
const BlackABI = new web3.eth.Contract(BlackMemoPool.abi, BlackMemoPool.address);
// const ControllerABI = new web3.eth.Contract(RBPoolController.abi, RBPoolController.address);

function abi(poolColor) {
  switch(poolColor) {
    case 'red':
      return RedABI;
    case 'black':
      return BlackABI;
    default:
      throw new Error('Invalid contract');
  }
}

async function totalSupply(poolColor) {
  return await dispatchMethodAsync(abi(poolColor).methods.totalSupply());
}

async function balanceOf(address, poolColor) {
  return await dispatchMethodAsync(abi(poolColor).methods.balanceOf(address));
}

export {
  totalSupply,
  balanceOf
}
