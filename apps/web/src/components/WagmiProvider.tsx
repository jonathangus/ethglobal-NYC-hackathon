import { ethers, providers } from 'ethers';
import { FC } from 'react';
import { Chain, chain, Connector, Provider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chains } from 'web3-config';

import { config } from '../config/config';

const RPC_URL: Record<Chains, string> = {
  [Chains.LOCALHOST]: 'http://localhost:8545',
  [Chains.RINKEBY]: `https://rinkeby.infura.io/v3/${config.INFURA_ID}`,
};

// This can be configured to multiple chain if you looking to support that
const localhostChain = {
  id: Chains.LOCALHOST,
  name: 'Localhost',
  rpcUrls: [RPC_URL[Chains.LOCALHOST]],
};

const chains: Chain[] =
  config.defaultChain == Chains.LOCALHOST ? [localhostChain] : [chain.rinkeby];

const defaultChain =
  config.defaultChain == Chains.LOCALHOST ? localhostChain : chain.rinkeby;

export const METAMASK_CONNECTOR = new InjectedConnector({
  chains,
});

const connectors = () => [
  new InjectedConnector({
    chains,
  }),
];

type ProviderConfig = { chainId?: number; connector?: Connector };
const validChains = [Chains.LOCALHOST, Chains.RINKEBY];

const provider = ({ chainId }: ProviderConfig) => {
  const wantedChain = validChains.includes(chainId as any)
    ? chainId
    : defaultChain.id;

  const rpcUrl = RPC_URL[wantedChain];

  if (rpcUrl) {
    return new ethers.providers.JsonRpcProvider(rpcUrl);
  }

  return providers.getDefaultProvider(wantedChain, {
    infura: config.INFURA_ID,
  });
};

const WagmiProvider: FC = ({ children }) => (
  <Provider autoConnect connectors={connectors} provider={provider}>
    {children}
  </Provider>
);

export default WagmiProvider;
