/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import AptosNftMinter from '@/components/AptosNftMinter';
import WalletSelector from '@/components/WalletSelector';


export default function Home() {

    const wallet = useAptosWallet()
    

    return (
        <>
            <Layout>
                <WalletSelector open={true} setOpen={()=>{}}/>
            </Layout>
        </>
    )
}
