import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useContractWrite, useProvider, useWaitForTransaction } from 'wagmi';

import {
  ContractFactory,
  ContractFunctions,
  ContractInstance,
} from '../config/types';
import { useMulticallStore } from '../context/MulticallContext';
import { getCacheKey } from '../utils/state-helper';
import useAddress from './useAddress';
import useNotice from './useNotice';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

function useWriteContract<
  T extends ContractInstance = Contract,
  TFunctionName extends string & keyof ContractFunctions<T> = string
>(
  typechainFactory: ContractFactory<T>,
  method: TFunctionName,
  options?: {
    address?: string;
    errorNotice?: boolean;
    onSuccess?: (result: ethers.providers.TransactionReceipt) => void;
    onError?: (error: Error) => void;
    onSuccessMessage?: () => string;
    onErrorMessage?: () => string;
    onSuccessRefetch?: {
      address?: string;
      method: string;
      params?: any[];
    };
  }
): [
  {
    data: Awaited<ReturnType<ContractFunctions<T>[TFunctionName]>>;
    error: Error;
    loading: boolean;
  },
  (config?: {
    params: Parameters<ContractFunctions<T>[TFunctionName]>;
    // params?: ParamsAsObject<
    //   ContractFunctions<T>[TFunctionName],
    //   any[]
    //   // ParamsAsArray<Parameters<ContractFunctions<T>[TFunctionName]>>
    // >;
    overrides?: ethers.CallOverrides;
  }) => ReturnType<ContractFunctions<T>[TFunctionName]>
] {
  const predefinedAddress = useAddress(typechainFactory);
  const queueIfNeeded = useMulticallStore((state) => state.queueIfNeeded);
  const address = options?.address || predefinedAddress;
  const errorNotice = options?.errorNotice ?? true;
  const provider = useProvider();

  const notice = useNotice();
  const { data, error, isLoading, write } = useContractWrite(
    {
      addressOrName: address,
      contractInterface: typechainFactory.abi,
    },
    method as string,

    {
      onError: (err: any) => {
        if (options?.onError && err) {
          options.onError(err);
        }

        if (errorNotice && err) {
          let message;
          if (err instanceof Error || err?.message) {
            message = `${method} failed! Message: ${err.message}`;
          } else {
            console.log(err);
            message = `${method} failed! Message: ${(
              err as any as string[]
            ).join(',')}`;
          }

          notice({
            status: 'error',
            message,
          });
        }
      },
    }
  );

  const tx = useWaitForTransaction({
    hash: data?.hash,

    onSettled: (result) => {
      if (options?.onSuccess) {
        options?.onSuccess(result);
      }

      if (options?.onSuccessMessage) {
        notice({
          status: 'success',
          message: options.onSuccessMessage(),
        });
      }

      if (options?.onSuccessRefetch) {
        const wantedAddress = options.onSuccessRefetch.address || address;
        const cacheKey = getCacheKey({
          ...options.onSuccessRefetch,
          args: options.onSuccessRefetch.params || [],
          address: wantedAddress,
        });

        queueIfNeeded(
          {
            ...options.onSuccessRefetch,
            args: options.onSuccessRefetch.params || [],
            address: wantedAddress,
            cacheKey,
          },
          typechainFactory,
          provider
        );
      }
    },
  });

  const _write = async (config?: {
    params?: Parameters<ContractFunctions<T>[TFunctionName]>;
    overrides?: ethers.CallOverrides;
  }) => {
    const params = config?.params || [];

    await write({
      args: params,
      overrides: config?.overrides,
    });
  };

  useEffect(() => {
    if (options?.onError && error) {
      options.onError(error);
    }

    if (errorNotice && error) {
      let message;
      if (error instanceof Error || (error as any)?.message) {
        message = `${method} failed! Message: ${error.message}`;
      } else {
        console.log(error);
        message = `${method} failed! Message: ${(error as any as string[]).join(
          ','
        )}`;
      }

      notice({
        status: 'error',
        message,
      });
    }
  }, [error, errorNotice]);

  return [
    {
      data: data as Awaited<ReturnType<ContractFunctions<T>[TFunctionName]>>,
      error,
      loading: isLoading || tx.isLoading,
    },
    _write as (config?: {
      params?: Parameters<ContractFunctions<T>[TFunctionName]>;
      overrides?: ethers.CallOverrides;
    }) => ReturnType<ContractFunctions<T>[TFunctionName]>,
  ];
}

export default useWriteContract;
