import { FC, useEffect } from 'react';
import { Button } from 'ui';
import { useAccount, useConnect } from 'wagmi';

import useCorrectChain from '../hooks/useCorrectChain';
import useNotice from '../hooks/useNotice';
import { formatAddressToShort } from '../utils/formatter';

const Web3ConnectButton: FC = () => {
  const {
    isSupported,
    connectToCorrectChain,
    loading: isSwitchingChain,
  } = useCorrectChain();

  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const notice = useNotice();

  useEffect(() => {
    if (error) {
      notice({
        status: 'error',
        message: error.message,
      });
    }
  }, [error]);

  if (!isSupported && accountData) {
    return (
      <Button onClick={connectToCorrectChain}>
        {isSwitchingChain ? 'Loading...' : ' Wrong chain'}
      </Button>
    );
  }

  if (accountData) {
    return (
      <Button onClick={() => disconnect()}>
        {accountData.ens?.name || formatAddressToShort(accountData.address)}
      </Button>
    );
  }

  return (
    <div>
      {data.connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => {
            if (!connector.ready) {
              return;
            }
            try {
              connect(connector);
            } catch (e) {}
          }}
        >
          Login
        </Button>
      ))}
    </div>
  );
};

export default Web3ConnectButton;
