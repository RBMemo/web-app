import { Box, Button, Card, Flex, Heading, Image, Text, useThemeUI } from "theme-ui";
import Skeleton from 'react-loading-skeleton';
import MemoToken from '../../images/memo_token.png';
import './PoolCard.css'

function PoolCardView({ data }) {
  return (
    <Card className="PoolCard" >
      <Heading as="h2">MEMO Pool</Heading>
      <Flex sx={{ columnGap: '5px', width: '100%' }}>
        <PoolColumn column={0} columnData={data.red} />
        <PoolColumn column={1} columnData={data.black} />
      </Flex>
      <Flex sx={{ columnGap: '10px' }}>
          <Button>Deposit / Withdraw</Button>
      </Flex>
    </Card>
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
