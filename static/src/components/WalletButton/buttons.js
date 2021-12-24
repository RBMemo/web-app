import { useContext } from 'react';
import { Button, Image } from 'theme-ui';
import { useResponsiveValue } from '@theme-ui/match-media';
import MetaMaskOnboarding from '@metamask/onboarding';
import { connect, requiredChain, switchChain } from '../../lib/MetaMask';
import { WalletContext } from '../../lib/WalletProvider';
import MetaMaskLogo from '../../images/metamask_logo.png';
import AvaxLogo from '../../images/avax_logo.svg'

function InstallButton() {
  return <BaseButton text="Install" imageSrc={MetaMaskLogo} variant="outlined" onClick={() => new MetaMaskOnboarding().startOnboarding() } />
}

function ConnectButton() {
  return <BaseButton text="Connect" imageSrc={MetaMaskLogo} variant="outlined" onClick={connect} />
}

function NetworkButton() {
  return <BaseButton text="Wrong Network" imageSrc={MetaMaskLogo} variant="outlined" onClick={() => { switchChain(requiredChain) }} />
}

function ConnectedButton() {
  const { account } = useContext(WalletContext);

  const accString = `${account}`;
  const text = useResponsiveValue([
    accString.slice(0, 6),
    [accString.slice(0, 6), '...', accString.slice(accString.length - 4, accString.length)].join('')
  ]);
  
  return <BaseButton text={text} imageSrc={AvaxLogo} />
}

function BaseButton({ text, imageSrc, ...props }) {
  return (
    <Button sx={{ display: 'flex', alignItems: 'center' }} {...props}>
      <Image src={imageSrc} width="20px" height="20px" mr="8px" />
      {text}
    </Button>
  );
}

export {
  InstallButton,
  ConnectButton,
  NetworkButton,
  ConnectedButton
}
