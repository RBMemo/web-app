import { useContext } from 'react';
import { WalletContext } from '../../lib/WalletProvider';
import { InstallButton, ConnectButton, NetworkButton, ConnectedButton } from './buttons';
import { requiredChain } from '../../lib/MetaMask';

function WalletButton() {
  const { account, metaMaskInstalled, chain } = useContext(WalletContext);

  let button = <ConnectButton />;
  if(!metaMaskInstalled)
    button = <InstallButton />;
  else if(chain !== requiredChain)
    button = <NetworkButton />;
  else if(account)
    button = <ConnectedButton />;

  return button;
}

export default WalletButton;
