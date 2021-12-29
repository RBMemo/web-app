import { Flex } from 'theme-ui';
import { PoolCard } from '../components/PoolCard';

function PoolPage() {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <PoolCard />
    </Flex>
  );
}

export default PoolPage;
