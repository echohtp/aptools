import { AppContext } from "@/components/AppContext";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  


import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
       <ToastContainer />
      <Component {...pageProps} />
    </AppContext>
  );
}

export default MyApp;
