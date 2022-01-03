import ThemeProvider from './lib/themes/ThemeProvider';
import WalletProvider from './lib/WalletProvider';
import NavBar from './components/NavBar';
import PoolPage from './pages/Pool';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <NavBar />
        <PoolPage />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
