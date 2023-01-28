import { AppContext } from "@/components/AppContext";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
