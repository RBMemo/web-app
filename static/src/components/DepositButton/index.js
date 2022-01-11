import { useContext, useState } from 'react';
import { Button, Spinner } from 'theme-ui';
import { WalletContext } from '../../lib/WalletProvider';
import { deposit } from '../../lib/MemoSplitIntegrator';

function DepositButton({ depositAmount, depositPool, disabled }) {
  const [busy, setBusy] = useState(false);
  const { account } = useContext(WalletContext);

  if(busy) disabled = true;

  async function onClick() {
    setBusy(true);
    await deposit(account, `${Number(depositAmount) * 10**9}`, depositPool);
    setBusy(false);
  }
  
  return (
    <Button disabled={disabled} variant={disabled ? 'disabled' : 'primary'} onClick={onClick}>
      {busy ? <Spinner color="text" height="15px" width="15px" mr="2" /> : null}
      {busy ? 'Depositing...' : 'Deposit'}
    </Button>
  );
}

export default DepositButton;
