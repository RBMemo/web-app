import { Flex, Box, Heading, Image } from 'theme-ui';
import WalletButton from '../WalletButton';
import SplitbaseLogo from '../../images/splitbase_logo.png';

export default function NavBar() {  
  return (
    <Flex sx={{ alignItems: 'center', width: '100%', mb: '4' }} maxHeight='5rem'>
      <Image src={SplitbaseLogo} sx={{ height: ['48px', '54px'] }} />
      <Box sx={{ px: 2, flex: 1 }}>
        <Heading as="h1" textAlign='center'>
          Splitbase
        </Heading>
      </Box>
      <Flex sx={{ p: 2, alignItems: 'center', columnGap: '10px' }}>
        <WalletButton />
      </Flex>
    </Flex>
  );
}
