import { Contract } from '@ethersproject/contracts';
import { useEffect } from 'react';

import {
  Awaited,
  ContractFactory,
  ContractFunctions,
  ContractInstance,
} from '../config/types';
import useAddress from './useAddress';
import useMulticallState from './useMulticallState';
import useNotice from './useNotice';

export function useReadContract<
  T extends ContractInstance = Contract,
  TFunctionName extends string & keyof ContractFunctions<T> = string
>(
  typechainFactory: ContractFactory<T>,
  method: TFunctionName,
  options?: {
    params?: Parameters<ContractFunctions<T>[TFunctionName]>;
    enabled?: boolean;
    address?: string;
    onSuccessMessage?: () => string;
    onErrorMessage?: (error: Error) => string;
  }
): {
  data: Awaited<ReturnType<ContractFunctions<T>[TFunctionName]>>;
  error: Error;
  loading: boolean;
} {
  const predefinedAddress = useAddress(typechainFactory);
  const params = options?.params || [];
  const address = options?.address || predefinedAddress;
  const enabled = (options?.enabled ?? true) && Boolean(address);

  const notice = useNotice();

  console.log(predefinedAddress);
  const value = useMulticallState(
    {
      method: method as string,
      address,
      args: params,
      enabled,
    },
    typechainFactory
  );

  useEffect(() => {
    if (value.error && options?.onErrorMessage) {
      notice({
        status: 'error',
        message: options.onErrorMessage(value.error),
      });
    }
  }, [value.error]);

  return value;
}

export default useReadContract;
