import type { AppProps } from 'next/app';
import React from 'react';
import { MulticallProvider } from '../context/MulticallContext';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';
import Web3Provider from '../components/Web3Provider';
import { createTheme, NextUIProvider, Row } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Header } from '../components/Header';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <NotificationsProvider>
          <Web3Provider>
            <MulticallProvider>
              <Header />
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
    </NextThemesProvider>
  );
}

export default MyApp;
