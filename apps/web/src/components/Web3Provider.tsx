import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { config, wantedChains } from '../config/config';

const { chains, provider } = configureChains(wantedChains, [
  infuraProvider({ infuraId: config.INFURA_ID }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: 'ETH NYC',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Web3Provider = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: 'NYC Hackathon',
        }}
        // theme={darkTheme({
        //   borderRadius: 'none',
        //   accentColor: '#000bff',
        // })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
