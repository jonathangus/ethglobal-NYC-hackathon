import { Counter__factory } from 'web3-config';
import ConnectButton from '../components/ConnectButton';
import Counter from '../components/Counter';
import useReadContract from '../hooks/useReadContract';

const Page = () => {
  const { data: currentTimestamp } = useReadContract(
    Counter__factory,
    'currentTimestamp'
  );
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <ConnectButton />
      </div>
      <Counter />
      <Counter />
      <Counter />
      {currentTimestamp && <div>Current timestamp: {+currentTimestamp}</div>}
    </div>
  );
};

export default Page;
