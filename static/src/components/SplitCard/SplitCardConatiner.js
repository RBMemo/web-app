import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import SplitCardView from "./SplitCardView";
import { totalSupply, balanceOf, memoBalanceOf, depositLock, withdrawLock, rebaseHistory } from '../../lib/MemoSplitIntegrator';
import { WalletContext } from '../../lib/WalletProvider';
import { rebaseMultipliers, supplyProportions, formatNumber, splitReducer } from '../../lib/SplitHelper';

function SplitCardContainer() {
  const [stats, dispatch] = useReducer(splitReducer, { red: {}, black: {} });
  const [memoBalance, setMemoBalance] = useState();
  const { account } = useContext(WalletContext);

  const fetchStats = useCallback(() => {
    Promise.all([totalSupply('red'), totalSupply('black')])
    .then(([redSupply, blackSupply]) => {
      dispatch({ type: 'setTotalSupply', pool: 'red', value: formatNumber(redSupply, 2, 9) });
      dispatch({ type: 'setTotalSupply', pool: 'black', value: formatNumber(blackSupply, 2, 9) });

      const multipliers = rebaseMultipliers(Number(redSupply), Number(blackSupply));
      dispatch({ type: 'setMultiplier', pool: 'red', value: formatNumber(multipliers[0]) });
      dispatch({ type: 'setMultiplier', pool: 'black', value: formatNumber(multipliers[1]) });
      
      const proportions = supplyProportions(Number(redSupply), Number(blackSupply));
      dispatch({ type: 'setProportion', pool: 'red', value: proportions[0] });
      dispatch({ type: 'setProportion', pool: 'black', value: proportions[1] });
    });

    balanceOf(account, 'red').then(balance => dispatch({
      type: 'setAccountBalance', pool: 'red', value: formatNumber(balance, 9, 9)
    }));

    balanceOf(account, 'black').then(balance => dispatch({
      type: 'setAccountBalance', pool: 'black', value: formatNumber(balance, 9, 9)
    }));

    withdrawLock().then(lock => dispatch({ type: 'setWithdrawLock', value: lock }));
    depositLock().then(lock => dispatch({ type: 'setDepositLock', value: lock }));
  }, [account]);

  const fetchMemoBalance = useCallback(() => {
    memoBalanceOf(account).then(balance => setMemoBalance(formatNumber(balance, 9, 9)));
  }, [account]);
  
  useEffect(() => {
    rebaseHistory().then(logs => {
      logs = logs.reverse().slice(0, 15);
      const history = logs.map(log => ({
        selectedPool: log.selectedPool,
        multiplier: formatNumber(rebaseMultipliers(log.redSupply, log.blackSupply)[log.selectedPool]),
        percentYield: formatNumber(log.amount / { 0: log.redSupply, 1: log.blackSupply }[log.selectedPool], 2, -2)
      }));

      dispatch({ type: 'setRebaseHistory', value: history })
    });
  }, []);

  return (
    <SplitCardView
    fetchStats={fetchStats}
    fetchMemoBalance={fetchMemoBalance}
    rebaseHistory={stats.rebaseHistory}
    memoBalance={memoBalance}
    stats={stats} />
  );
}

export default SplitCardContainer;
