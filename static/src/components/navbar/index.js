import { Flex, Box, Heading } from 'theme-ui';
import WalletButton from '../WalletButton';

export default function NavBar() {  
  return (
    <Flex sx={{ alignItems: 'center', width: '100%', mb: '5' }} maxHeight='5rem'>
      <Box sx={{ px: 2, flex: 1 }}>
        <Heading as="h1" textAlign='center'>
          Some Name
        </Heading>
      </Box>
      <Flex sx={{ p: 2, alignItems: 'center', columnGap: '10px' }}>
        <WalletButton />
      </Flex>
    </Flex>
  );
}
