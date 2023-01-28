/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import Link from 'next/link'
import AptosCollectionMinter from '@/components/AptosCollectionMinter';
import { useWallet as solanaUseWallet } from '@solana/wallet-adapter-react';
import { useWallet as aptosUseWallet } from '@aptos-labs/wallet-adapter-react';
import SolanaCollectionMinter from '@/components/SolanaCollectionMinter';


export default function CollectionPage() {

    const solanaWallet = solanaUseWallet()
    const aptosWallet = aptosUseWallet()

    const connected = solanaWallet.connected || aptosWallet.connected

    return (
        <>
            <Layout>
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                    {!connected &&
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                            <div className="text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                </svg>


                                <h3 className="mt-2 text-sm font-medium text-gray-900">Not connected</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by connecting your wallet above</p>
                            </div>
                        </div>
                    }
                    {aptosWallet.connected &&
                        <div>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <AptosCollectionMinter />
                            </div>
                        </div>
                    }

                    {solanaWallet.connected &&
                        <div>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <SolanaCollectionMinter />
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
