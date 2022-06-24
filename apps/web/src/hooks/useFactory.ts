import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { useProvider } from 'wagmi';

import { ContractFactory, ContractInstance } from '../config/types';
import useAddress from './useAddress';

function useFactory<T extends ContractInstance = Contract>(
  typechainFactory: ContractFactory<T>,
  options?: { address?: string }
): T {
  const defaultAddress = useAddress(typechainFactory);
  const provider = useProvider();
  const address = options?.address || defaultAddress;
  const contractFactory = useMemo(
    () => address && typechainFactory.connect(address, provider),
    [address, typechainFactory]
  );

  return contractFactory as any;
}

export default useFactory;
