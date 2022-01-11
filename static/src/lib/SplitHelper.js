function rebaseMultipliers(redTotalSupply, blackTotalSupply) {
  let redMultiplier = 1, blackMultiplier = 1;

  if(redTotalSupply)
    redMultiplier = 1 + (blackTotalSupply / redTotalSupply);

  if(blackTotalSupply)
    blackMultiplier = 1 + (redTotalSupply / blackTotalSupply);
  
  return [redMultiplier, blackMultiplier];
}

function supplyProportions(redTotalSupply, blackTotalSupply) {
  let redProportion = 0, blackProportion = 0;

  if(redTotalSupply && blackTotalSupply) {
    redProportion = Math.min(redTotalSupply / blackTotalSupply, 1);
    blackProportion = Math.min(blackTotalSupply / redTotalSupply, 1);
  }
  else if(redTotalSupply)
    redProportion = 1;
  else if(blackTotalSupply)
    blackProportion = 1;
  
  return [redProportion, blackProportion];
}

function formatNumber(number, precision = 2, decimals = 0) {
  return (Number(number) / 10**decimals).toLocaleString(undefined, { maximumFractionDigits: precision });
}

function splitReducer(state, action) {
  function setValue(pool, key, value) {
    return {
      ...state,
      [pool]: {
        ...state[pool],
        [key]: value
      }
    };
  }
  
  switch(action.type) {
    case 'setTotalSupply':
      return setValue(action.pool, 'totalSupply', action.value);
    case 'setAccountBalance':
      return setValue(action.pool, 'accountBalance', action.value);
    case 'setMultiplier':
      return setValue(action.pool, 'multiplier', action.value);
    case 'setProportion':
      return setValue(action.pool, 'proportion', action.value);
    case 'setWithdrawLock':
      return { ...state, 'withdrawLock': action.value }
    case 'setDepositLock':
      return { ...state, 'depositLock': action.value }
    default:
      throw new Error('Unrecognized action');
  }
}

export {
  rebaseMultipliers,
  supplyProportions,
  formatNumber,
  splitReducer
}
