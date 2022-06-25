import { useAccount } from 'wagmi';

const useUserAddress = (): string | void => {
  const { data } = useAccount();

  return data?.address;
};

export default useUserAddress;
