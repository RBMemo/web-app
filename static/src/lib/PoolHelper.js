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
  
  return [redProportion, blackProportion];
}

function formatNumber(number, decimals = 2) {
  return number.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function poolReducer(state, action) {
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
    default:
      throw new Error('Unrecognized action');
  }
}

export {
  rebaseMultipliers,
  supplyProportions,
  formatNumber,
  poolReducer
}
