import { Button } from '@nextui-org/react';
import { ethers } from 'ethers';
import { FC } from 'react';
import { MyNFT__factory } from 'web3-config';
import useReadContract from '../hooks/useReadContract';
import useUserAddress from '../hooks/useUserAddress';
import useWriteContract from '../hooks/useWriteContract';

const Mint = () => {
  const [{ loading }, mint] = useWriteContract(MyNFT__factory, 'mint');
  const userAddress = useUserAddress() as string;
  const { data: price } = useReadContract(MyNFT__factory, 'MINT_PRICE');

  return (
    <Button
      css={{
        position: 'fixed',
        right: '$8',
        bottom: '$8',
      }}
      auto
      ghost
      disabled={loading}
      onClick={() => {
        mint({
          params: [userAddress, 1],
          overrides: {
            value: price,
          },
        });
      }}
    >
      Mint
    </Button>
  );
};

export default Mint;
