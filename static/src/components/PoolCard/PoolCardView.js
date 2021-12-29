import { Button, Card, Flex, Heading, Text, useThemeUI } from "theme-ui";
import './PoolCard.css'

function PoolCardView() {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '24px' }} >
      <Heading as="h2">MEMO Pool</Heading>
      <Flex sx={{ columnGap: '5px', width: '100%' }}>
        <PoolColumn column={0} />
        <PoolColumn column={1} />
      </Flex>
      <Flex sx={{ columnGap: '10px' }}>
          <Button>Deposit / Withdraw</Button>
      </Flex>
    </Card>
  );
}

function PoolColumn({ column }) {
  const { theme } = useThemeUI();
  const colors = [
    { bar: 'primary', btn: 'secondary' },
    { bar: 'secondary', btn: 'primary' }
  ][column];

  return (
    <div className="PoolColumn">
      <Flex className="PoolColumnData">
        <Text>1.29x</Text>
        <Text>1213 MEMO</Text>
        <Text>Deposited: 1.2</Text>
        
      </Flex>
      <div className="PoolColumnBar" style={{ background: theme.colors[colors.bar], height: '100%' }} />
    </div>
  );
}

export default PoolCardView;
