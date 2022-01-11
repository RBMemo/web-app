import { useContext, useState } from 'react';
import { Button, Spinner } from 'theme-ui';
import { WalletContext } from '../../lib/WalletProvider';
import { poolSwap } from '../../lib/MemoSplitIntegrator';

function TransferButton({ transferAmount, fromPool, toPool, disabled }) {
  const [busy, setBusy] = useState(false);
  const { account } = useContext(WalletContext);

  if(busy) disabled = true;

  async function onClick() {
    setBusy(true);
    await poolSwap(account, `${Number(transferAmount) * 10**9}`, fromPool, toPool);
    setBusy(false);
  }

  return (
    <Button disabled={disabled} variant={disabled ? 'disabled' : 'primary'} onClick={onClick}>
      {busy ? <Spinner color="text" height="15px" width="15px" mr="2" /> : null}
      {busy ? 'Transfering...' : 'Transfer'}
    </Button>
  );
}

export default TransferButton;
