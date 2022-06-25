import { Multicall } from 'ethereum-multicall';
import { BigNumber, ethers } from 'ethers';
import { createContext, FC, useContext, useEffect, useMemo } from 'react';
import { useBlockNumber, useProvider } from 'wagmi';
import { Factory, Multicall2__factory } from 'web3-config';
import create from 'zustand';

import useAddress from '../hooks/useAddress';
import useCorrectChain from '../hooks/useCorrectChain';

type QueueOptions = {
  method: string;
  address: string;
  cacheKey: string;
  args?: string[];
};

type State = {
  errors: Record<string, any>;
  loading: Record<string, any>;
  result: Record<string, any>;
  queue: Record<
    string,
    {
      multicallData: any;
    }
  >;
};
type MulticallContextValue = null;

const MulticallContext = createContext<MulticallContextValue>(null);

const actions = {
  addToQueue: 'addToQueue',
  removeFromQueue: 'removeFromQueue',
  addResult: 'addResult',
  updateResults: 'updateResults',
  addError: 'addError',
  setLoader: 'setLoader',
};

const initialState: State = {
  queue: {},
  result: {},
  errors: {},
  loading: {},
};

function reducer(state, action): State {
  switch (action.type) {
    case actions.addToQueue:
      return {
        ...state,
        queue: {
          ...state.queue,
          [action.cacheKey]: {
            read: action.read,
            multicallData: action.multicallData,
          },
        },
      };

    case actions.removeFromQueue:
      return {
        ...state,
        queue: {
          ...state.queue,
          [action.cacheKey]: undefined,
        },
      };

    case actions.updateResults:
      return {
        ...state,
        result: {
          ...state.result,
          ...action.result,
        },
      };

    case actions.addResult:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.cacheKey]: undefined,
        },
        result: {
          ...state.result,
          [action.cacheKey]: action.result,
        },
      };

    case actions.addError:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.cacheKey]: action.error,
        },
      };

    case actions.setLoader:
      if (!action.isLoading) {
        return {
          ...state,
          loading: {
            ...state.loading,
            [action.cacheKey]: false,
          },
        };
      }

      // Dont show loader state if data exist and its just refetching
      if (state.result[action.cacheKey]) {
        return state;
      }

      return {
        ...state,
        loading: {
          ...state.loading,
          [action.cacheKey]: true,
        },
      };

    default:
      throw new Error();
  }
}

type MyStore = State & {
  dispatch: (args) => any;
  queueIfNeeded: (
    options: QueueOptions,
    factory: Factory,
    provider: ethers.providers.BaseProvider
  ) => void;
  removeFromQueue: ({ cacheKey }: { cacheKey: string }) => void;
  callMulticalls: (multicall: Multicall) => Promise<void>;
};

export const useMulticallStore = create<MyStore>((set, get) => ({
  ...initialState,
  dispatch: (args) => set((state) => reducer(state, args)),
  queueIfNeeded: (
    options: QueueOptions,
    factory: Factory,
    provider: ethers.providers.BaseProvider
  ) => {
    const { cacheKey, method, args } = options;
    const dispatch = get().dispatch;

    const read = async () => {
      const contract = factory.connect(options.address, provider);
      try {
        dispatch({
          type: actions.setLoader,
          cacheKey,
          isLoading: true,
        });

        const result = await contract[method](...args);
        dispatch({
          type: actions.addResult,
          result,
          cacheKey,
        });
      } catch (e) {
        console.error(e);
        dispatch({ type: actions.addError, error: e });
      } finally {
        dispatch({ type: actions.setLoader, cacheKey, isLoading: false });
      }
    };

    const multicallData = {
      reference: cacheKey,
      contractAddress: options.address,
      abi: factory.abi,
      calls: [
        {
          reference: cacheKey,
          methodName: method,
          methodParameters: args,
        },
      ],
    };

    dispatch({ type: actions.addToQueue, multicallData, read, cacheKey });
    read();
  },

  removeFromQueue: ({ cacheKey }: { cacheKey: string }) => {
    const dispatch = get().dispatch;
    dispatch({ type: actions.removeFromQueue, cacheKey });
  },
  callMulticalls: async (multicall: Multicall) => {
    const queue = get().queue;
    const dispatch = get().dispatch;

    const calls = Object.values(queue)
      .map((da) => da?.multicallData)
      .filter(Boolean);

    if (calls.length === 0) {
      return;
    }

    try {
      const { results } = await multicall.call(calls);
      const updatedResult = {};
      for (const key in results) {
        if (results[key].callsReturnContext[0].success) {
          let value = results[key].callsReturnContext[0].returnValues[0];
          if (value && value.type === 'BigNumber') {
            value = BigNumber.from(value);
          }
          updatedResult[key] = value;
        } else {
          console.log('error', results[key]);
        }
      }
      dispatch({ type: actions.updateResults, result: updatedResult });
    } catch (e) {
      console.error(e);
    }
  },
}));

export const MulticallProvider: FC = ({ children }) => {
  const provider = useProvider();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const multicallAddress = useAddress(Multicall2__factory);
  const multicall = useMemo(
    () =>
      new Multicall({
        ethersProvider: provider,
        tryAggregate: true,
        multicallCustomContractAddress: multicallAddress,
      }),
    [multicallAddress, provider]
  );
  const { isSupported } = useCorrectChain();
  const callMulticalls = useMulticallStore((state) => state.callMulticalls);

  useEffect(() => {
    if (isSupported) {
      callMulticalls(multicall);
    }
  }, [isSupported, blockNumber, callMulticalls, multicall]);

  return (
    <MulticallContext.Provider value={null}>
      {children}
    </MulticallContext.Provider>
  );
};

export const useMulticallContext = () => {
  const ctx = useContext(MulticallContext);

  return ctx;
};
