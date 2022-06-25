import { MyNFT__factory } from 'web3-config';
import useReadContract from '../hooks/useReadContract';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useWriteContract from '../hooks/useWriteContract';
import useUserAddress from '../hooks/useUserAddress';

const Page = () => {
  const { data: mintedComplete } = useReadContract(
    MyNFT__factory,
    'mintedComplete'
  );

  const userAddress = useUserAddress();
  const [_, mint] = useWriteContract(MyNFT__factory, 'mint');
  const { data: minted } = useReadContract(MyNFT__factory, 'balanceOf', {
    params: [userAddress as string],
  });

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {minted && <div>You minted: {+minted}</div>}
      <ConnectButton />
      <button onClick={() => mint()}>Mint</button>
      {mintedComplete && (
        <div>mintedComplete: {mintedComplete ? 'YES' : 'NO'}</div>
      )}
    </div>
  );
};

export default Page;
