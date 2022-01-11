import { useCallback, useContext, useReducer, useState } from 'react';
import SplitCardView from "./SplitCardView";
import { totalSupply, balanceOf, memoBalanceOf } from '../../lib/MemoPoolIntegrator';
import { WalletContext } from '../../lib/WalletProvider';
import { rebaseMultipliers, supplyProportions, formatNumber, poolReducer } from '../../lib/SplitHelper';

function SplitCardContainer() {
  const [stats, dispatch] = useReducer(poolReducer, { red: {}, black: {} });
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
  }, [account]);

  const fetchMemoBalance = useCallback(() => {
    memoBalanceOf(account).then(balance => setMemoBalance(formatNumber(balance, 9, 9)));
  }, [account]);

  return (
    <SplitCardView
    fetchStats={fetchStats}
    fetchMemoBalance={fetchMemoBalance}
    memoBalance={memoBalance}
    stats={stats} />
  );
}

export default SplitCardContainer;
