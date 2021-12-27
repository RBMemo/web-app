import ThemeProvider from './lib/themes/ThemeProvider';
import WalletProvider from './lib/WalletProvider';
import NavBar from './components/NavBar';

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <NavBar />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
