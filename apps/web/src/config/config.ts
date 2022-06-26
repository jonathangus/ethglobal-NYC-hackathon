import { Chains } from 'web3-config';
import { chain } from 'wagmi';

type Config = {
  defaultChain: Chains;
  isProduction: boolean;
  INFURA_ID: string;
};

export let defaultChain = Chains.RINKEBY;

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

if (process.env.NEXT_PUBLIC_WANTED_CHAIN) {
  if (Chains[parseInt(process.env.NEXT_PUBLIC_WANTED_CHAIN)]) {
    defaultChain = parseInt(process.env.NEXT_PUBLIC_WANTED_CHAIN);

    if (!INFURA_ID) {
      throw new Error(
        'Require NEXT_PUBLIC_INFURA_ID if you use another chain then localhost'
      );
    }
  }
}

export const wantedChains = [chain.rinkeby, chain.kovan];

export const config: Config = {
  isProduction: process.env.NODE_ENV === 'production',
  defaultChain,
  INFURA_ID,
};
