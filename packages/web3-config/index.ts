import multicallDeploymentLocalhost from './deployments/localhost/Multicall2.json';
import nftDeploymentLocalhost from './deployments/localhost/MyNFT.json';
import nftDeploymentRinkeby from './deployments/rinkeby/MyNFT.json';

export * from './typechain';
import * as _typechain from './typechain';

import { Multicall2__factory, MyNFT__factory } from './typechain';

export enum Chains {
  // LOCALHOST = 1337,
  RINKEBY = 4,
}

export const typechain = _typechain;

export type AvailableContracts =
  | Multicall2__factory['contractName']
  | MyNFT__factory['contractName'];

type AddressObj = Record<AvailableContracts, string>;

const _multicall2 = new Multicall2__factory();
const _myNFT = new MyNFT__factory();

export const Address: Record<Chains, AddressObj> = {
  // [Chains.LOCALHOST]: {
  //   [_multicall2.contractName]: multicallDeploymentLocalhost.address,
  //   [_myNFT.contractName]: nftDeploymentLocalhost.address,
  // },
  [Chains.RINKEBY]: {
    [_multicall2.contractName]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    [_myNFT.contractName]: nftDeploymentRinkeby.address,
  },
};

export const getAddress = (
  chain: Chains,
  contract: AvailableContracts
): string => Address[chain][contract];

export type Factory = any;
