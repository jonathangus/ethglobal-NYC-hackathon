import { FC } from 'react';
import { useAccount } from 'wagmi';
import { Counter__factory } from 'web3-config';
import useAddress from '../hooks/useAddress';
import useReadContract from '../hooks/useReadContract';
import useWriteContract from '../hooks/useWriteContract';

const Counter: FC = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const { data, error } = useReadContract(Counter__factory, 'getCount', {
    params: [accountData?.address as string],
    enabled: !!accountData?.address,
  });

  const counterAddress = useAddress(Counter__factory);
  const [increaseState, increase] = useWriteContract(
    Counter__factory,
    'incrementCounter',
    {
      onSuccessRefetch: {
        address: counterAddress,
        method: 'getCount',
        params: [accountData?.address as string],
      },
    }
  );

  return (
    <div>
      {data && <div>Count: {data.toString()}</div>}
      {increaseState.loading && 'Loading...'}
      <button onClick={() => increase()}>Increase</button>
    </div>
  );
};

export default Counter;
