import { createContext, useEffect, useState } from 'react';
import { initMetaMask } from './MetaMask';

export const WalletContext = createContext();

function WalletProvider({ children }) {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(window.ethereum !== undefined);
  const [accounts, setAccounts] = useState([]);
  const [chain, setChain] = useState();
  const account = accounts[0];

  useEffect(() => {
    initMetaMask(setAccounts, setChain).then(res => setMetaMaskInstalled(res));
  }, []);

  const walletInfo = {
    metaMaskInstalled,
    account,
    chain
  }

  return (
    <WalletContext.Provider value={walletInfo}>
      {children}
    </WalletContext.Provider>
  );
}

export default WalletProvider;
