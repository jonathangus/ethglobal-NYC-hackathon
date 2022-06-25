import { MyNFT__factory } from 'web3-config';
import useReadContract from '../hooks/useReadContract';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Page = () => {
  const { data: mintedComplete } = useReadContract(
    MyNFT__factory,
    'mintedComplete'
  );

  const { data: steps } = useReadContract(MyNFT__factory, 'steps', {
    params: ['0'],
  });

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <ConnectButton />
      {mintedComplete && (
        <div>mintedComplete: {mintedComplete ? 'YES' : 'NO'}</div>
      )}
    </div>
  );
};

export default Page;
