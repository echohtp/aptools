import Layout from '@/components/Layout'
import Link from 'next/link'
import { useState } from 'react';
import { NFTStorage } from 'nft.storage'
import { toMetaplexFileFromBrowser } from '@metaplex-foundation/js'
import { AptosClient } from 'aptos'
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { TransactionPayload } from '@martiandao/aptos-web3.js/dist/api/data-contracts';
import { toast } from 'react-toastify'
import {Button} from 'antd'
export default function AptosCollectionMinter() {

    const client = new AptosClient(process.env.NEXT_PUBLIC_APTOS_URL!);
    const wallet = useWallet()
    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! })

    const [collectionName, setCollectionName] = useState<string>("")
    const [collectionDescription, setCollectionDescription] = useState<string>("")
    const [collectionUrl, setCollectionUrl] = useState<string>("")
    const [mintLoading, setMintLoading] = useState<boolean>(false)
    const [cid, setCid] = useState<any>(null);
    const { signAndSubmitTransaction } = useWallet()

    const handleChange = async (file: any) => {
        console.log(file)
        const filePlus = await toMetaplexFileFromBrowser(file)
        const cid = await nftstorage.storeBlob(new Blob([filePlus.buffer]))
        console.log(cid)
        setCid(cid)
    }

    return (
        <>


            <div>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    {!wallet.connected &&
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                            <p>Please connect your wallet above.</p>
                        </div>
                    }
                    {wallet.connected && <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Aptos Collection</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Collections are groups of NFTs
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder=""
                                        onChange={(e) => {
                                            setCollectionName(e.target.value)
                                        }}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    What is the name of this collection?
                                </p>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea

                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        defaultValue={''}
                                        onChange={(e) => {
                                            setCollectionDescription(e.target.value)
                                        }}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Brief description for your collection.
                                </p>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    URL
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="url"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder=""
                                        onChange={(e) => {
                                            setCollectionUrl(e.target.value)
                                        }}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    What URL should be associated with this collection?
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <Button
                            loading={mintLoading}
                                className="border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={async () => {
                                    console.log("mint it")
                                    setMintLoading(true)
                                    const payload: TransactionPayload = {
                                        type: "entry_function_payload",
                                        function: "0x3::token::create_collection_script",
                                        type_arguments: [],
                                        arguments: [
                                            collectionName,
                                            collectionDescription,
                                            collectionUrl,
                                            "9007199254740991",
                                            [
                                                false,
                                                false,
                                                false
                                            ]
                                        ]
                                    };
                                    try {
                                        const response = await signAndSubmitTransaction(payload);
                                        await client.waitForTransaction(response?.hash || "");
                                        toast("success")
                                        setCollectionName("")
                                        setCollectionDescription("")
                                        setCollectionUrl("")

                                        //@ts-ignore
                                        document.getElementById("name").value = ""
                                        //@ts-ignore
                                        document.getElementById("description").value = ""
                                        //@ts-ignore
                                        document.getElementById("url").value = ""

                                    } catch (error: any) {
                                        console.log("error", error);
                                        toast(error)
                                    }finally{
                                        setMintLoading(false)
                                    }
                                }}
                            >
                                Mint
                            </Button>
                        </div>
                    </div>}
                </div>

            </div>

        </>
    )
}
