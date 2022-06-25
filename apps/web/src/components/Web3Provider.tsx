import '@rainbow-me/rainbowkit/styles.css';

import {
  apiProvider,
  configureChains,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createClient, WagmiProvider } from 'wagmi';

import { config, wantedChains } from '../config/config';

const { chains, provider } = configureChains(wantedChains, [
  apiProvider.infura(config.INFURA_ID),
  apiProvider.fallback(),
]);

const { connectors } = getDefaultWallets({
  appName: 'Anotherblock',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: 'NYC Hackathon',
        }}
        theme={darkTheme({
          borderRadius: 'none',
          accentColor: '#000bff',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
