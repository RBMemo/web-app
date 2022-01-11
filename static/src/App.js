import ThemeProvider from './lib/themes/ThemeProvider';
import WalletProvider from './lib/WalletProvider';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SplitListPage from './pages/SplitList';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <NavBar />
        <SplitListPage />
        <Footer />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
