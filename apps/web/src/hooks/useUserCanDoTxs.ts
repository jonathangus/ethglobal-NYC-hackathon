import { useAccount } from 'wagmi';

const useUserCanDoTxs = (): boolean => {
  const [{ data }] = useAccount();
  return Boolean(data);
};

export default useUserCanDoTxs;
