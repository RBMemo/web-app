import { useEffect, useState } from "react";
import { Badge, Box, Button, Card, Flex, Heading, Image, Input, NavLink, Select, Text, useThemeUI } from "theme-ui";
import Skeleton from 'react-loading-skeleton';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { FiExternalLink } from 'react-icons/fi';
import { MdLock } from 'react-icons/md';
import MemoToken from '../../images/memo_token.png';
import DepositButton from '../DepositButton';
import WithdrawButton from '../WithdrawButton';
import TransferButton from '../TransferButton';
import NavSlider from '../NavSlider';
import RebaseCountdown from '../RebaseCountdown';
import './SplitCard.css'

function SplitCardView(props) {
  const [pageIndex, setPageIndex] = useState(0);
  
  function onIndexChange(newIndex) {
    setPageIndex(newIndex);
  }

  const cardPages = [
    <SplitStatsPage fetchStats={props.fetchStats} stats={props.stats} />,
    <PoolDepositPage fetchMemoBalance={props.fetchMemoBalance}
      memoBalance={props.memoBalance}
      redBalance={props.stats.red.accountBalance}
      blackBalance={props.stats.black.accountBalance}
      locked={props.stats.depositLock} />,
    <PoolWithdrawPage
      redBalance={props.stats.red.accountBalance}
      blackBalance={props.stats.black.accountBalance}
      locked={props.stats.withdrawLock} />,
    <PoolSwapPage
      redBalance={props.stats.red.accountBalance}
      blackBalance={props.stats.black.accountBalance} />
  ];
  
  return (
    <Card className="SplitCard" >
      <Box sx={{ textAlign: 'center' }}>
        <Heading as="h2">MEMO Split</Heading>
        <NavLink variant="hintWithImage" sx={{ justifyContent: 'center' }}
        href="https://app.wonderland.money/#/stake" target="_blank">
          <FiExternalLink />
          Stake
        </NavLink>
        <RebaseCountdown variant="hint" rebaseCron={'0 6,14,22 * * *'} />
      </Box>
      <Box className="NavSliderAndLockInfoContainer" sx={{ width: ['100%', '70%', '50%'] }}>
        <NavSlider buttons={['Stats', 'Deposit', 'Withdraw', 'Swap']} onIndexChange={onIndexChange} />
        <LockInfo withdrawLock={props.stats.withdrawLock} depositLock={props.stats.depositLock} />
      </Box>
      {cardPages[pageIndex]}
    </Card>
  );
}

function LockInfo({ withdrawLock, depositLock }) {
  function LockBadge({ text }) {
    return (
      <Badge sx={{ display: 'flex', alignItems: 'center', columnGap: '5px', width: 'min-content', paddingTop: '2px', paddingBottom: '2px' }}
      onClick={() => window.open('https://docs.splitbase.fi/guides/deposit-withdraw#deposit-withdraw-locking', '_blank')}>
        <MdLock />
        {text}
      </Badge>
    );
  }

  const LockBadges = [];

  if(withdrawLock)
    LockBadges.push(<LockBadge key={0} text="Withdraw" />);
  
  if(depositLock)
    LockBadges.push(<LockBadge key={1} text="Deposit" />);


  return (
    <Flex sx={{ alignItems: 'center', columnGap: '16px' }}>
      {LockBadges}
    </Flex>
  );
}

function PoolSwapPage({ redBalance, blackBalance }) {
  const [transferValue, setTransferValue] = useState('');
  const [poolRoutes, setPoolRoutes] = useState({ from: 'red', to: 'black' });
  
  const balances = {
    red: redBalance,
    black: blackBalance
  };

  const colors = {
    red: 'primary',
    black: 'secondary'
  }

  function swapPoolRoutes() {
    setPoolRoutes({
      to: poolRoutes.from,
      from: poolRoutes.to
    });
  }

  function onTransferValueChange(e) {
    const re = /^[0-9\b|.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value))
      setTransferValue(e.target.value);
  }

  let validInput = true;
  if(transferValue !== '' && (isNaN(transferValue) || isNaN(parseFloat(transferValue)) || Number(transferValue) > Number(balances[poolRoutes.from])))
    validInput = false;

  return(
    <Box sx={{ width: ['100%', '80%'] }}>
      <Flex className="PoolSwapContainer" mb="4">
        <Flex className="PoolColumnData" sx={{ bg: colors[poolRoutes.from], borderRadius: '10px', width: '100%' }}>
          <Box className="PoolColumnItem">
            {balances[poolRoutes.from] || <Skeleton width="60px" />}
            <Text variant="hint">{`${poolRoutes.from.charAt(0).toUpperCase()}MPL Balance`}</Text>
          </Box>
        </Flex>
        <Flex className="PoolColumnData" sx={{ bg: colors[poolRoutes.to], borderRadius: '10px', width: '100%' }}>
          <Box className="PoolColumnItem">
            {balances[poolRoutes.to] || <Skeleton width="60px" />}
            <Text variant="hint">{`${poolRoutes.to.charAt(0).toUpperCase()}MPL Balance`}</Text>
          </Box>
        </Flex>
        <Button className="PoolSwapButton"
        sx={{ border: '2px solid rgba(64, 64, 64)', p: 1, width: '32px', height: '32px' }}
        onClick={swapPoolRoutes}>
          <IoMdArrowRoundDown style={{ verticalAlign: 'middle' }} />
        </Button>
      </Flex>

      <Flex sx={{ width: '100%', alignItems: 'center' }}>
        <Text variant="hint" sx={{ flex: 1, textTransform: 'capitalize' }}>
          {balances[poolRoutes.from] !== undefined ? `${poolRoutes.from.charAt(0).toUpperCase()}MPL Balance: ${balances[poolRoutes.from]}` : <Skeleton width="80px" />}
        </Text>
        <Button variant="hint" onClick={() => setTransferValue(balances[poolRoutes.from])}>Max</Button>
      </Flex>
      <Input sx={{ mt: 1, mb: 3, borderColor: validInput ? undefined : 'primary' }}
      placeholder={`${poolRoutes.from.charAt(0).toUpperCase()}MPL to transfer`}
      value={transferValue}
      onChange={onTransferValueChange} />

      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <TransferButton transferAmount={transferValue} fromPool={poolRoutes.from} toPool={poolRoutes.to} disabled={!validInput || Number(transferValue) === 0}/>
      </Flex>
    </Box>
  );
}

function PoolWithdrawPage({ redBalance, blackBalance, locked }) {
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
        <WithdrawButton withdrawAmount={withdrawValue} withdrawPool={poolValue} disabled={!validInput || Number(withdrawValue) === 0 || locked}/>
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

function PoolDepositPage({ fetchMemoBalance, memoBalance, redBalance, blackBalance, locked }) {
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
        <DepositButton depositAmount={depositValue} depositPool={poolValue} disabled={!validInput || Number(depositValue) === 0 || locked}/>
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

function SplitStatsPage({ fetchStats, stats }) {
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

export default SplitCardView;
