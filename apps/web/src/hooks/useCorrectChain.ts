import { FC, useEffect } from 'react';
import { useNetwork } from 'wagmi';

import useNotice from './useNotice';

const useCorrectChain = (): {
  isSupported: boolean;
  loading: boolean;
  currentChainId: number;
  connectToCorrectChain: () => void;
} => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  let isSupported = true;
  if (typeof data?.chain?.unsupported !== 'undefined') {
    isSupported = !data?.chain?.unsupported;
  } else if (data.chains.length === 0) {
    isSupported = true;
  }
  const notice = useNotice();

  useEffect(() => {
    if (error) {
      notice({
        status: 'error',
        message: error.message,
      });
    }
  }, [error]);

  const connectToCorrectChain = () => {
    switchNetwork(data?.chains[0]?.id);
  };

  return {
    isSupported,
    loading,
    connectToCorrectChain,
    currentChainId: data?.chain?.id,
  };
};

export default useCorrectChain;
