import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import { NFTStorage } from 'nft.storage'
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { Connection } from '@solana/web3.js'
import { Button } from 'antd'
import {
    Metaplex,
    walletAdapterIdentity,
    toMetaplexFileFromBrowser,
} from '@metaplex-foundation/js'
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";


const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "MP4", "GLB", "HTML"];
const coverFileType = ["JPG", "PNG", "JPEG"];

const SolanaNftMinter = () => {

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_URL!)
    const metaplex = Metaplex.make(connection).use(
        walletAdapterIdentity(useWallet())
    )

    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! })

    const [nftName, setNftName] = useState<string>("")
    const [nftDescription, setNftDescription] = useState<string>("")
    const [fileCid, setFileCid] = useState<any>(null);
    const [fileCoverCid, setFileCoverCid] = useState<any>(null);
    const [royaltyWallets, setRoyaltyWallets] = useState<{ address: string, share: number }[]>([])
    const [fileLoading, setFileLoading] = useState<boolean>(false)
    const [fileCoverLoading, setFileCoverLoading] = useState<boolean>(false)
    const [mintLoading, setMintLoading] = useState<boolean>(false)
    const [fileType, setFileType] = useState<string>("")
    const [fileCoverType, setFileCoverType] = useState<string>("")
    const [metaplexData, setMetaplexData] = useState<any>({
        name: '',
        description: '',
        symbol: '',
        animation_url: '',
        seller_fee_basis_points: 0,
        image: '',
        properties: {
            category: '',
            files: [],
            creators: []
        }
    })

    const wallet = useWallet()

    const handleChange = async (file: any) => {
        setFileLoading(true)
        console.log(file)
        const filePlus = await toMetaplexFileFromBrowser(file)
        const cid = await nftstorage.storeBlob(new Blob([filePlus.buffer]))
        console.log(cid)
        setFileCid(cid)
        setFileType(file.type)
        setFileLoading(false)

    };

    const handleCoverChange = async (file: any) => {
        setFileCoverLoading(true)
        console.log(file)
        const filePlus = await toMetaplexFileFromBrowser(file)
        const cid = await nftstorage.storeBlob(new Blob([filePlus.buffer]))
        console.log(cid)
        setFileCoverCid(cid)
        setFileCoverType(file.type)
        setFileCoverLoading(false)

    };

    useMemo(() => {
        if (wallet.connected) {
            setRoyaltyWallets([{ address: wallet.publicKey!.toBase58(), share: 100 }])
        }
    }, [wallet])


    return (
        <>
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create Solana NFT</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {/* Collections are groups of NFTs */}
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
                        <label className="block text-sm font-medium text-gray-700">Art</label>
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        >
                            {fileLoading &&
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {fileCid ? <img src={`https://ipfs.io/ipfs/${fileCid}`} width={300} alt={nftName} /> :
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
                            {!fileCid && !fileLoading &&
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                                        <p className="text-xs text-gray-500">Image or Video, no file size limit.</p>
                                    </div>
                                </div>}
                            {!fileLoading && fileCid && <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                    {fileType.includes('image') &&
                                        <img src={`https://ipfs.io/ipfs/${fileCid}`} width={300} alt={nftName} />
                                    }
                                    {fileType.includes('video') &&
                                        <video src={`https://ipfs.io/ipfs/${fileCid}`} width={300} autoPlay controls />
                                    }
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

                    {fileCid && !fileType.includes('image') &&
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                            <FileUploader
                                handleChange={handleCoverChange}
                                name="file"
                                types={coverFileType}
                            >
                                {fileCoverLoading &&
                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                        <div className="space-y-1 text-center">

                                            {fileCoverCid ? <img src={`https://ipfs.io/ipfs/${fileCoverCid}`} width={300} alt={nftName} /> :
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
                                    </div>}
                                {!fileCoverCid &&
                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                                            <p className="text-xs text-gray-500">Image or Video, no file size limit.</p>
                                        </div>
                                    </div>}


                                {!fileCoverLoading && fileCoverCid && <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <img src={`https://ipfs.io/ipfs/${fileCoverCid}`} width={300} alt={nftName} />

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
                    }
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <Button
                    loading={mintLoading}
                    className="border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={async () => {
                        console.log("mint it")
                        setMintLoading(true)
                        let _metaplexData = metaplexData
                        _metaplexData.name = nftName
                        _metaplexData.description = nftDescription
                        _metaplexData.seller_fee_basis_points = 10 * 100
                        _metaplexData.properties.creators = royaltyWallets
                        _metaplexData.properties.category = fileType.split('/')[0]

                        if (!fileType.includes('image')) {
                            _metaplexData.animation_url = `https://ipfs.io/ipfs/${fileCid}`
                            _metaplexData.image = `https://ipfs.io/ipfs/${fileCoverCid}`
                            _metaplexData.properties.files = [{ uri: `https://ipfs.io/ipfs/${fileCid}`, type: fileType }, { uri: `https://ipfs.io/ipfs/${fileCoverCid}`, type: fileCoverType }]
                        } else {
                            _metaplexData.image = `https://ipfs.io/ipfs/${fileCid}`
                            _metaplexData.properties.files = [{ uri: `https://ipfs.io/ipfs/${fileCid}`, type: fileType }]
                            delete (_metaplexData.animation_url)
                        }

                        const cid = await nftstorage.storeBlob(new Blob([JSON.stringify(_metaplexData)]))
                        console.log(`https://ipfs.io/ipfs/${cid}`)
                        await metaplex.nfts().create({
                            name: nftName,
                            sellerFeeBasisPoints: 10 * 100,
                            uri: `https://ipfs.io/ipfs/${cid}`
                        }).catch((e) => {
                            toast(e)
                         }).finally(() => {
                            toast("Done!")
                            setMintLoading(false)
                        })

                    }}
                >
                    Mint
                </Button>
            </div>
        </>
    )
}

export default SolanaNftMinter