import type { AppProps } from 'next/app';
import React from 'react';
import { MulticallProvider } from '../context/MulticallContext';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';
import Web3Provider from '../components/Web3Provider';
import { NextUIProvider } from '@nextui-org/react';
import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NotificationsProvider>
        <Web3Provider>
          <MulticallProvider>
            <Component {...pageProps} />
            <NotificationHandler />

            <style global jsx>{`
              html,
              body,
              body > div:first-child,
              div#__next,
              div#__next > div {
                height: 100%;
                margin: 0px;
              }
            `}</style>
          </MulticallProvider>
        </Web3Provider>
      </NotificationsProvider>
    </NextUIProvider>
  );
}

export default MyApp;
