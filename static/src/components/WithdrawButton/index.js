import { useContext, useState } from 'react';
import { Button, Spinner } from 'theme-ui';
import { WalletContext } from '../../lib/WalletProvider';
import { withdraw } from '../../lib/MemoPoolIntegrator';

function WithdrawButton({ withdrawAmount, withdrawPool, disabled }) {
  const [busy, setBusy] = useState(false);
  const { account } = useContext(WalletContext);

  if(busy) disabled = true;

  async function onClick() {
    setBusy(true);
    await withdraw(account, `${Number(withdrawAmount) * 10**9}`, withdrawPool);
    setBusy(false);
  }

  return (
    <Button disabled={disabled} variant={disabled ? 'disabled' : 'primary'} onClick={onClick}>
      {busy ? <Spinner color="text" height="15px" width="15px" mr="2" /> : null}
      {busy ? 'Withdrawing...' : 'Withdraw'}
    </Button>
  );
}

export default WithdrawButton;
