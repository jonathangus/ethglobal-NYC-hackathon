import type { AppProps } from 'next/app';
import React from 'react';
import WagmiProvider from '../components/WagmiProvider';
import { MulticallProvider } from '../context/MulticallContext';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider>
      <WagmiProvider>
        <MulticallProvider>
          <Component {...pageProps} />
          <NotificationHandler />
        </MulticallProvider>
      </WagmiProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
