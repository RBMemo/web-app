import { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Heading, Image, Input, Select, Text, useThemeUI } from "theme-ui";
import Skeleton from 'react-loading-skeleton';
import MemoToken from '../../images/memo_token.png';
import DepositButton from "../DepositButton";
import WithdrawButton from "../WithdrawButton";
import NavSlider from "../NavSlider";
import './PoolCard.css'

function PoolCardView(props) {
  const [pageIndex, setPageIndex] = useState(0);
  
  function onIndexChange(newIndex) {
    setPageIndex(newIndex);
  }

  const cardPages = [
    <PoolStatsPage fetchStats={props.fetchStats} stats={props.stats} />,
    <PoolDepositPage fetchMemoBalance={props.fetchMemoBalance}
      memoBalance={props.memoBalance}
      redBalance={props.stats.red.accountBalance}
      blackBalance={props.stats.black.accountBalance} />,
    <PoolWithdrawPage 
      redBalance={props.stats.red.accountBalance}
      blackBalance={props.stats.black.accountBalance} />
  ]
  
  return (
    <Card className="PoolCard" >
      <Heading as="h2">MEMO Pools</Heading>
      <NavSlider buttons={['Stats', 'Deposit', 'Withdraw', 'Swap']} onIndexChange={onIndexChange} />
      {cardPages[pageIndex]}
    </Card>
  );
}

function PoolWithdrawPage({ redBalance, blackBalance }) {
  const [withdrawValue, setWithdrawValue] = useState('');
  const [poolValue, setPoolValue] = useState('red');

  function onWithdrawValueChange(e) {
    const re = /^[0-9\b|.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value))
      setWithdrawValue(e.target.value);
  }

  const balance = poolValue === 'red' ? redBalance : blackBalance;

  let validInput = true;
  if(withdrawValue !== '' && (isNaN(withdrawValue) || isNaN(parseFloat(withdrawValue)) || Number(withdrawValue) > Number(balance)))
    validInput = false;

  return (
    <Box sx={{ width: ['100%', '80%'] }}>
      <Box mb="4">
        <Text variant="hint">Withdraw Pool</Text>
        <Select sx={{ mt: 1 }} value={poolValue} onChange={e => setPoolValue(e.target.value)}>
          <option value="red">Red</option>
          <option value="black">Black</option>
        </Select>
      </Box>

      <Flex sx={{ width: '100%', alignItems: 'center' }}>
        <Text variant="hint" sx={{ flex: 1, textTransform: 'capitalize' }}>
          {balance !== undefined ? `${poolValue.charAt(0).toUpperCase()}MPL Balance: ${balance}` : <Skeleton width="80px" />}
        </Text>
        <Button variant="hint" onClick={() => setWithdrawValue(balance)}>Max</Button>
      </Flex>
      <Input sx={{ mt: 1, mb: 3, borderColor: validInput ? undefined : 'primary' }}
      placeholder={`${poolValue.charAt(0).toUpperCase()}MPL to withdraw`}
      value={withdrawValue}
      onChange={onWithdrawValueChange} />

      <Flex sx={{ width: '100%', justifyContent: 'center', mb: 4 }}>
        <WithdrawButton withdrawAmount={withdrawValue} withdrawPool={poolValue} disabled={!validInput || Number(withdrawValue) === 0}/>
      </Flex>

      <Flex sx={{ width: '100%', columnGap: '5px' }}>
        {['red', 'black'].map((color, i) => {
          const balance = color === 'red' ? redBalance : blackBalance;
          return (
            <Flex key={i} className="PoolColumnData" sx={{ bg: color === 'red' ? 'primary' : 'secondary', borderRadius: '10px' }}>
              <Box className="PoolColumnItem">
                {balance || <Skeleton width="60px" />}
                <Text variant="hint">Current Balance</Text>
              </Box>
              <Box className="PoolColumnItem">
                {balance ? poolValue === color ? validInput ? Number(balance) - Number(withdrawValue) : <Skeleton width="60px" /> : Number(balance) : <Skeleton width="60px" />}
                <Text variant="hint">Resulting Balance</Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

function PoolDepositPage({ fetchMemoBalance, memoBalance, redBalance, blackBalance }) {
  const [depositValue, setDepositValue] = useState('');
  const [poolValue, setPoolValue] = useState('red');
  
  useEffect(() => {
    fetchMemoBalance();
  }, [fetchMemoBalance]);

  function onDepositValueChange(e) {
    const re = /^[0-9\b|.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value))
      setDepositValue(e.target.value);
  }

  let validInput = true;
  if(depositValue !== '' && (isNaN(depositValue) || isNaN(parseFloat(depositValue)) || Number(depositValue) > Number(memoBalance)))
    validInput = false;

  return (
    <Box sx={{ width: ['100%', '80%'] }}>
      <Flex sx={{ width: '100%', alignItems: 'center' }}>
        <Text variant="hint" sx={{ flex: 1 }}>
          {memoBalance !== undefined ? `MEMO Balance: ${memoBalance}` : <Skeleton width="80px" />}
        </Text>
        <Button variant="hint" onClick={() => setDepositValue(memoBalance)}>Max</Button>
      </Flex>
      <Input sx={{ mt: 1, mb: 4, borderColor: validInput ? undefined : 'primary' }}
      placeholder="MEMO to deposit"
      value={depositValue}
      onChange={onDepositValueChange} />
      
      <Box mb="3">
        <Text variant="hint">Deposit Pool</Text>
        <Select sx={{ mt: 1 }} value={poolValue} onChange={e => setPoolValue(e.target.value)}>
          <option value="red">Red</option>
          <option value="black">Black</option>
        </Select>
      </Box>

      <Flex sx={{ width: '100%', justifyContent: 'center', mb: 4 }}>
        <DepositButton depositAmount={depositValue} depositPool={poolValue} disabled={!validInput || Number(depositValue) === 0}/>
      </Flex>

      <Flex sx={{ width: '100%', columnGap: '5px' }}>
        {['red', 'black'].map((color, i) => {
          const balance = color === 'red' ? redBalance : blackBalance;
          return (
            <Flex key={i} className="PoolColumnData" sx={{ bg: color === 'red' ? 'primary' : 'secondary', borderRadius: '10px' }}>
              <Box className="PoolColumnItem">
                {balance || <Skeleton width="60px" />}
                <Text variant="hint">Current Balance</Text>
              </Box>
              <Box className="PoolColumnItem">
                {balance ? poolValue === color ? validInput ? Number(balance) + Number(depositValue) : <Skeleton width="60px" /> : Number(balance) : <Skeleton width="60px" />}
                <Text variant="hint">Resulting Balance</Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

function PoolStatsPage({ fetchStats, stats }) {
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  
  return (
    <Flex sx={{ columnGap: '5px', width: '100%' }}>
      <PoolColumn column={0} columnData={stats.red} />
      <PoolColumn column={1} columnData={stats.black} />
    </Flex>
  );
}

function PoolColumn({ column, columnData }) {
  const { theme } = useThemeUI();
  const colors = [
    { bar: 'primary' },
    { bar: 'secondary' }
  ][column];

  const { multiplier, totalSupply, accountBalance, proportion } = columnData;

  return (
    <div className="PoolColumn">
      <Flex className="PoolColumnData">
        <Box className="PoolColumnItem">
          {multiplier ? `${multiplier}x` : <Skeleton width="60px" />}
          <Text variant="hint">Rebase Multiplier</Text>
        </Box>
        <Box className="PoolColumnItem">
          <Flex sx={{ alignItems: 'center', columnGap: '4px' }}>
            {totalSupply || <Skeleton width="60px" />}
            <Image src={MemoToken} sx={{ width: '16px', height: '16px' }} />
          </Flex>
          <Text variant="hint">Pool Supply</Text>
        </Box>
        <Box className="PoolColumnItem">
          {accountBalance || <Skeleton width="60px" />}
          <Text variant="hint">Deposited</Text>
        </Box>
      </Flex>
      <div className="PoolColumnBar" style={{ background: theme.colors[colors.bar], height: `${100 * (proportion || .08)}%` }} />
    </div>
  );
}

export default PoolCardView;
