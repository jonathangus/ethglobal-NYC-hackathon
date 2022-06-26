import { BigNumber } from 'ethers';
import { useEffect } from 'react';
import { useProvider } from 'wagmi';
import shallow from 'zustand/shallow';

import { useMulticallStore } from '../context/MulticallContext';
import { getCacheKey, MulticallStateOptions } from '../utils/state-helper';
import useConnection from './useConnection';
import useCorrectChain from './useCorrectChain';
import useWindowFocus from './useWindowFocus';

type UseMultiCallStateReturn = {
  data: any;
  error: Error;
  loading: boolean;
};

const useMulticallState = (
  options: MulticallStateOptions & { enabled: boolean },
  factory
): UseMultiCallStateReturn => {
  const provider = useProvider();
  const { isSupported } = useCorrectChain();
  let internetConnection = useConnection();

  const windowActive = useWindowFocus();
  const { method, address, args, enabled } = options;
  const cacheKey = getCacheKey(options);
  const queueIfNeeded = useMulticallStore((state) => state.queueIfNeeded);
  const removeFromQueue = useMulticallStore((state) => state.removeFromQueue);

  const data = useMulticallStore(
    (state) => state.result[cacheKey],
    (state, newState) => {
      if (state instanceof BigNumber && newState instanceof BigNumber) {
        return (state as BigNumber).eq(newState as BigNumber);
      }
      return shallow(state, newState);
    }
  );
  const error = useMulticallStore((state) => state.errors[cacheKey]);
  const loading = useMulticallStore((state) => state.loading[cacheKey]);

  useEffect(() => {
    if (enabled && internetConnection && windowActive && provider) {
      queueIfNeeded({ cacheKey, method, address, args }, factory, provider);
    }

    return () => {
      removeFromQueue({ cacheKey });
    };
  }, [
    enabled,
    cacheKey,
    isSupported,
    internetConnection,
    windowActive,
    provider,
  ]);

  return {
    data,
    error,
    loading,
  };
};

export default useMulticallState;
