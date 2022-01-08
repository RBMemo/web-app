import { Flex } from 'theme-ui';
import { PoolCard } from '../components/PoolCard';
import './Page.css'

function PoolPage() {
  return (
    <Flex className="Page">
      <PoolCard />
    </Flex>
  );
}

export default PoolPage;
