import { AppContext } from "@/components/AppContext";
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ga from '@/lib/ga'
import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  BackpackWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { ApolloProvider as AptosApolloProvider } from "@apollo/client";
import { ApolloProvider as HolaplexApolloProvider } from "@apollo/client";
import holaplexClient from "@/lib/apollo/holaplex-client";
import aptosClient from '@/lib/apollo/aptos-client';


import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
require('@solana/wallet-adapter-react-ui/styles.css');


function MyApp({ Component, pageProps }: AppProps) {

  const network = WalletAdapterNetwork.Mainnet;
  const router = useRouter()

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])



  return (
    <AppContext>
      <HolaplexApolloProvider client={holaplexClient}>
        <AptosApolloProvider client={aptosClient}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
              <ToastContainer />
              <WalletModalProvider>
                <Component {...pageProps} />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </AptosApolloProvider>
      </HolaplexApolloProvider>
    </AppContext>
  );
}

export default MyApp;
