/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import AptosNftMinter from '@/components/AptosNftMinter';
import { useWallet as solanaUseWallet } from '@solana/wallet-adapter-react';
import { useWallet as aptosUseWallet } from '@aptos-labs/wallet-adapter-react';
import SolanaNftMinter from '@/components/SolanaNftMinter';


export default function Home() {

    const solanaWallet = solanaUseWallet()
    const aptosWallet = aptosUseWallet()

    const connected = solanaWallet.connected || aptosWallet.connected

    return (
        <>
            <Layout>
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                    {!connected &&
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                            <p>Please connect your wallet above.</p>
                        </div>
                    }
                    {aptosWallet.connected &&
                        <div>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <AptosNftMinter />
                            </div>
                        </div>
                    }

                    {solanaWallet.connected &&
                        <div>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <SolanaNftMinter />
                            </div>
                        </div>
                    }

                    <div className="mt-4 flex">
                        <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true"> &larr;&nbsp;</span>
                            Back
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    )
}
