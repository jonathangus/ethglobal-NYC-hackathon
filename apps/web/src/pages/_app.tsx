import type { AppProps } from 'next/app';
import React from 'react';
import { MulticallProvider } from '../context/MulticallContext';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';
import Web3Provider from '../components/Web3Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider>
      <Web3Provider>
        <MulticallProvider>
          <Component {...pageProps} />
          <NotificationHandler />
        </MulticallProvider>
      </Web3Provider>
    </NotificationsProvider>
  );
}

export default MyApp;
