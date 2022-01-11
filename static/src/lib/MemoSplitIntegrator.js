import Web3 from 'web3';
import { dispatchMethodAsync, memoPermit } from './MetaMask';
import RedMemoPool from '@splitbase-dev/contracts/deployments/mainnet/RedMemoPool.json';
import BlackMemoPool from '@splitbase-dev/contracts/deployments/mainnet/BlackMemoPool.json';
import ERC20ABI from './contracts/ERC20ABI.json';
import RBPoolController from '@splitbase-dev/contracts/deployments/mainnet/RBPoolController.json';

const MEMO_ADDRESS = '0x136Acd46C134E8269052c62A67042D6bDeDde3C9';

const ethProvider = window.ethereum;
const web3 = new Web3(ethProvider);

const RedABI = new web3.eth.Contract(RedMemoPool.abi, RedMemoPool.address);
const BlackABI = new web3.eth.Contract(BlackMemoPool.abi, BlackMemoPool.address);
const MemoABI = new web3.eth.Contract(ERC20ABI, MEMO_ADDRESS)
const ControllerABI = new web3.eth.Contract(RBPoolController.abi, RBPoolController.address);

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

function poolEnum(poolColor) {
  switch(poolColor) {
    case 'red':
      return 0;
    case 'black':
      return 1;
    default:
      throw new Error(`Invalid Pool Color: ${poolColor}`);
  }
}

async function totalSupply(poolColor) {
  return await dispatchMethodAsync(abi(poolColor).methods.totalSupply());
}

async function balanceOf(address, poolColor) {
  return await dispatchMethodAsync(abi(poolColor).methods.balanceOf(address));
}

async function memoBalanceOf(address) {
  return await dispatchMethodAsync(MemoABI.methods.balanceOf(address));
}

async function withdrawLock() {
  return await dispatchMethodAsync(ControllerABI.methods.withdrawLock());
}

async function depositLock() {
  return await dispatchMethodAsync(ControllerABI.methods.depositLock());
}

async function deposit(account, amount, poolColor) {
  try {
    const pool = poolEnum(poolColor);
    const signature = await memoPermit(account, RBPoolController.address, amount);
    await dispatchMethodAsync(ControllerABI.methods.deposit(amount, pool, signature), { from: account });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function withdraw(account, amount, poolColor) {
  try {
    const pool = poolEnum(poolColor);
    await dispatchMethodAsync(ControllerABI.methods.withdraw(amount, pool), { from: account });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function poolSwap(account, amount, fromPoolColor, toPoolColor) {
  try {
    const fromPool = poolEnum(fromPoolColor);
    const toPool = poolEnum(toPoolColor);
    await dispatchMethodAsync(ControllerABI.methods.poolSwap(amount, fromPool, toPool), { from: account });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export {
  totalSupply,
  balanceOf,
  memoBalanceOf,
  deposit,
  withdraw,
  poolSwap,
  withdrawLock,
  depositLock
}
