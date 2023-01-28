import { FileUploader } from "react-drag-drop-files";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import WalletSelector from '@/components/WalletSelector';

const BlurryForm = () => {
    const [walletOpen, setWalletOpen] = useState<boolean>(false)
    return (
        <>
            
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6 blur-md pointer-events-none select-none relative">


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
                            handleChange={() => { }}
                            name="file"
                            types={[]}
                        >
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
                            </div>
                        </FileUploader>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 blur-md pointer-events-none select-none">
                <button
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Mint
                </button>
            </div>
        </>
    )



}

export default BlurryForm