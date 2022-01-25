import { useContext, useState } from 'react';
import { Button, Spinner } from 'theme-ui';
import { WalletContext } from '../../lib/WalletProvider';
import { deposit, withdraw, poolSwap } from '../../lib/MemoSplitIntegrator';

export default function TransactionButton({ action, actionName, disabled }) {
  const [busy, setBusy] = useState(false);

  if(busy) disabled = true;

  async function onClick() {
    setBusy(true);
    await action();
    setBusy(false);
  }

  return (
    <Button disabled={disabled} variant={disabled ? 'disabled' : 'primary'} onClick={onClick}>
      {busy ? <Spinner color="text" height="15px" width="15px" mr="2" /> : null}
      {busy ? `${actionName}ing...` : `${actionName}`}
    </Button>
  );
}

function DepositButton({ depositAmount, depositPool, disabled }) {
  const { account } = useContext(WalletContext);
  
  const txProps = {
    actionName: 'Deposit',
    disabled,
    action: async () => deposit(account, `${Number(depositAmount) * 10**9}`, depositPool)
  }

  return <TransactionButton {...txProps} />;
}

function WithdrawButton({ withdrawAmount, withdrawPool, disabled }) {
  const { account } = useContext(WalletContext);
  
  const txProps = {
    actionName: 'Withdraw',
    disabled,
    action: async () => withdraw(account, `${Number(withdrawAmount) * 10**9}`, withdrawPool)
  }

  return <TransactionButton {...txProps} />;
}

function TransferButton({ transferAmount, fromPool, toPool, disabled }) {
  const { account } = useContext(WalletContext);
  
  const txProps = {
    actionName: 'Transfer',
    disabled,
    action: async () => poolSwap(account, `${Number(transferAmount) * 10**9}`, fromPool, toPool)
  }

  return <TransactionButton {...txProps} />;
}

export {
  DepositButton,
  WithdrawButton,
  TransferButton
}
