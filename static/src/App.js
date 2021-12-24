import { ThemeProvider } from '@theme-ui/core';
import theme from './theme';
import NavBar from './components/navbar';
import WalletProvider from './lib/WalletProvider';

function App() {
  return (
    <ThemeProvider {...{theme}}>
      <WalletProvider>
        <NavBar />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
