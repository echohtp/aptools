import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import { NFTStorage } from 'nft.storage'
import { toMetaplexFileFromBrowser } from '@metaplex-foundation/js'
import { AptosClient, TokenClient } from 'aptos'
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { TransactionPayload } from '@martiandao/aptos-web3.js/dist/api/data-contracts';
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { BarLoader } from 'react-spinners'
import * as ga from '@/lib/ga'


const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const AptosTokenMinter = () => {

    const client = new AptosClient(process.env.NEXT_PUBLIC_APTOS_URL!);

    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! })

    const [nftCollection, setNftCollection] = useState<string>("")
    const [nftName, setNftName] = useState<string>("")
    const [nftDescription, setNftDescription] = useState<string>("")
    const [mintLoading, setMintLoading] = useState<boolean>(false)
    const [loadingFile, setLoadingFile] = useState<boolean>(false)
    const wallet = useWallet()

    const [cid, setCid] = useState<any>(null);
    const { signAndSubmitTransaction } = useWallet()

    const handleChange = async (file: any) => {
        setLoadingFile(true)
        console.log(file)
        const filePlus = await toMetaplexFileFromBrowser(file)
        const cid = await nftstorage.storeBlob(new Blob([filePlus.buffer]))
        console.log(cid)
        setCid(cid)
        setLoadingFile(false)
    };


    return (
        <>
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create Aptos NFT</h3>
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
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={''}
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Brief description for your NFT.
                        </p>
                    </div>

                    <div className="col-span-3">
                        <fieldset className="space-y-5">
                            <legend className="sr-only">Mutabilty</legend>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="mutable"
                                        aria-describedby="mutable-description"
                                        name="mutable"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        defaultChecked={true}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="mutable" className="font-medium text-gray-700">
                                        Mutable?
                                    </label>
                                    <p id="mutable-description" className="text-gray-500">
                                        Control if the NFT can be updated in the future
                                    </p>
                                </div>
                            </div>
                        </fieldset>
                    </div>


                    {/* <div className="col-span-3">
                        <fieldset className="space-y-5">
                            <legend className="sr-only">Mutabilty</legend>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="supply"
                                        aria-describedby="supply-description"
                                        name="supply"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="supply" className="font-medium text-gray-700">
                                        Supply
                                    </label>
                                    <p id="supply-description" className="text-gray-500">
                                        Control if the token maximum is mutable
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="uri"
                                        aria-describedby="uri-description"
                                        name="uri"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="uri" className="font-medium text-gray-700">
                                        URI
                                    </label>
                                    <p id="uri-description" className="text-gray-500">
                                        Control if the token uri is mutable
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="offers"
                                        aria-describedby="offers-description"
                                        name="offers"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="offers" className="font-medium text-gray-700">
                                        Royalty
                                    </label>
                                    <p id="offers-description" className="text-gray-500">
                                        Control if the token royalty is mutable
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="royalty"
                                        aria-describedby="royalty-description"
                                        name="royalty"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="royalty" className="font-medium text-gray-700">
                                        Description
                                    </label>
                                    <p id="royalty-description" className="text-gray-500">
                                        Control if the token description is mutable
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="properties"
                                        aria-describedby="properties-description"
                                        name="properties"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="properties" className="font-medium text-gray-700">
                                        Properties
                                    </label>
                                    <p id="properties-description" className="text-gray-500">
                                    Control if the property map is mutable
                                    </p>
                                </div>
                            </div>
                        </fieldset>
                    </div> */}


                    <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        >
                            {loadingFile &&
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                    {cid ? <img src={`https://ipfs.io/ipfs/${cid}`} width={300} alt={nftName} /> :
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
                                    }
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-medium  focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2 "
                                        >
                                            <BarLoader color="#36d7b7" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            }
                            {!loadingFile && !cid && <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                            {!loadingFile && cid && <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                <Button
                    loading={mintLoading}
                    className="border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={async () => {
                        console.log("mint it")
                        setMintLoading(true)
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
                                    //@ts-ignore
                                    document.getElementById("mutable").checked,
                                    //@ts-ignore
                                    document.getElementById("mutable").checked,
                                    //@ts-ignore
                                    document.getElementById("mutable").checked,
                                    //@ts-ignore
                                    document.getElementById("mutable").checked,
                                    //@ts-ignore
                                    document.getElementById("mutable").checked
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


                            setNftCollection("")
                            setCid("")
                            setNftName("")
                            setNftDescription("")

                            //@ts-ignore
                            document.getElementById("name").value = ""
                            //@ts-ignore
                            document.getElementById("about").value = ""
                            //@ts-ignore
                            document.getElementById("collection").value = ""

                            ga.event({
                                action: 'aptos_nft_minted',
                                params: {who: wallet.account?.address}
                            })


                        } catch (error: any) {
                            console.log("error", error);
                            toast(error)
                        } finally {
                            setMintLoading(false)
                        }
                    }}
                >
                    Mint
                </Button>
            </div>
        </>
    )
}

export default AptosTokenMinter