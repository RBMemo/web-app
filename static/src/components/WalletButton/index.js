import { useContext } from 'react';
import { WalletContext } from '../../lib/WalletProvider';
import { InstallButton, ConnectButton, ConnectedButton } from './buttons';

function WalletButton() {
  const { account, metaMaskInstalled } = useContext(WalletContext);

  let button = <ConnectButton />;
  if(!metaMaskInstalled)
    button = <InstallButton />;
  else if(account)
    button = <ConnectedButton />;

  return button;
}

export default WalletButton;
