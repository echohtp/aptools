/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import Link from 'next/link'
import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import { NFTStorage } from 'nft.storage'
import { toMetaplexFileFromBrowser } from '@metaplex-foundation/js'
import { AptosClient, TokenClient } from 'aptos'
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { TransactionPayload } from '@martiandao/aptos-web3.js/dist/api/data-contracts';
import { toast } from 'react-toastify'
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

export default function Home() {

    const client = new AptosClient(process.env.NEXT_PUBLIC_APTOS_URL!);
    const tokenClient = new TokenClient(client);

    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! })

    const [nftCollection, setNftCollection] = useState<string>("")
    const [nftName, setNftName] = useState<string>("")
    const [nftDescription, setNftDescription] = useState<string>("")

    const wallet = useWallet()

    const [cid, setCid] = useState<any>(null);
    const { signAndSubmitTransaction } = useWallet()

    const handleChange = async (file: any) => {
        console.log(file)
        const filePlus = await toMetaplexFileFromBrowser(file)
        const cid = await nftstorage.storeBlob(new Blob([filePlus.buffer]))
        console.log(cid)
        setCid(cid)
    };

    return (
        <>
            <Layout>
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                    {!wallet.connected &&
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                            <p>Please connect your wallet above.</p>
                        </div>
                    }

                    {wallet.connected && <div>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create NFT</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {/* Collections are groups of NFTs */}
                                    </p>
                                </div>


                                <div className="col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Collection
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="collection"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder=""
                                            onChange={((e) => {
                                                setNftCollection(e.target.value)
                                            })}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        What collection will this NFT live in?
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
                                                onChange={((e) => {
                                                    setNftName(e.target.value)
                                                })}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            What is the name of this masterpiece?
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
                                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description for your NFT.
                                        </p>
                                    </div>

                                    <div className="col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                        <FileUploader
                                            handleChange={handleChange}
                                            name="file"
                                            types={fileTypes}
                                        >
                                            {!cid && <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                <div className="space-y-1 text-center">

                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-medium  focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2 "
                                                        >
                                                            <span>Upload a file</span>
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF, no file size limit.</p>
                                                </div>
                                            </div>}
                                            {cid && <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                <div className="space-y-1 text-center">

                                                    <img src={`https://ipfs.io/ipfs/${cid}`} width={300} />
                                                    <div className="flex justify-center text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 "
                                                        >
                                                            <span>Replace the file</span>
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF, no file size limit.</p>
                                                </div>
                                            </div>}
                                        </FileUploader>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={async () => {
                                        console.log("mint it")

                                        const payload: TransactionPayload = {
                                            type: "entry_function_payload",
                                            function: "0x3::token::create_token_script",
                                            type_arguments: [],
                                            arguments: [
                                                nftCollection,
                                                nftName,
                                                nftDescription,
                                                "1",
                                                "9007199254740991",
                                                `https://ipfs.io/ipfs/${cid}`,
                                                wallet.account?.address,
                                                "0",
                                                "0",
                                                [
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                ],
                                                [],
                                                [],
                                                []
                                            ],
                                        };
                                        try {
                                            const response = await signAndSubmitTransaction(payload);
                                            await client.waitForTransaction(response?.hash || "");
                                            toast("success")
                                        } catch (error: any) {
                                            console.log("error", error);
                                            toast(error)
                                        }
                                    }}
                                >
                                    Mint
                                </button>
                            </div>
                        </div>
                    </div>}

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
