import { useNetwork } from 'wagmi';

import { config, wantedChains } from '../config/config';

const useCorrectChain = (): {
  isSupported: boolean;
  loading: boolean;
  currentChainId: number;
} => {
  const { isLoading, activeChain } = useNetwork({
    chainId: config.defaultChain,
  });

  let currentChainId = config.defaultChain;

  if (wantedChains.map((chain) => chain.id).includes(activeChain?.id)) {
    currentChainId = activeChain.id;
  }

  return {
    isSupported: !activeChain?.unsupported,
    loading: isLoading,
    currentChainId: currentChainId,
  };
};

export default useCorrectChain;
