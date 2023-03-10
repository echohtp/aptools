import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useQuery, gql } from "@apollo/client";
import { useEffect, useMemo } from 'react';
import aptosClient from '@/lib/apollo/aptos-client';
import { useState } from 'react';
import { EyeIcon, WalletIcon } from '@heroicons/react/20/solid'
import { PublicKey } from '@solana/web3.js';
import { BarLoader } from 'react-spinners';
import * as ga from '@/lib/ga'

const AptosWalletNftViewer = () => {

    const router = useRouter()
    const { address } = router.query

    const [myNfts, setMyNfts] = useState<any[] | null>()
    const [myTokens, setMyTokens] = useState<string[]>([])
    const [searchAddress, setSearchAddress] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    const GET_TOKENS = gql`
        query GetTokens($address: String) {
            token_ownerships(
                where: {owner_address: {_eq: $address}}
            ){
                owner_address
                name
                collection_name
                creator_address
                amount
                collection_data_id_hash
                property_version
                token_data_id_hash
            }
        }
    `;

    const GET_TOKEN = gql`
        query GetToken ($token: String) {
        token_datas(
            limit: 1
            where: {token_data_id_hash: {_eq: $token}}
        ) {
            description
            metadata_uri
            name
            creator_address
        }
        }
    `;

    useEffect(() => {
        if (address) {
            aptosClient.query({
                query: GET_TOKENS,
                variables: {
                    address: address
                }
            }).then(res => {
                console.log(res)
                let _tokens = res.data.token_ownerships.map((t: any) => t.token_data_id_hash)
                let _stokens = new Set(_tokens)
                _tokens = Array.from(_stokens)
                setMyTokens(_tokens)
            })
        }
    }, [address, GET_TOKENS])


    useMemo(async () => {
        if (myTokens.length > 0) {
            console.log("We got something back from the API!")
            console.log(myTokens)
            let _nfts = []
            for (const token of myTokens) {
                console.log("Getting: ", token)
                let res = await aptosClient.query({
                    query: GET_TOKEN,
                    variables: {
                        token: token
                    }
                })

                let _nft = res.data.token_datas[0]
                _nfts.push(_nft)
                console.log(_nft)
            }
            setMyNfts(_nfts)
            setLoading(false)
            ga.event({
                action: 'aptos_wallet_viewed',
                params: { who: address }
            })

        }
    }, [myTokens, GET_TOKEN])

    const handleSearch = () => {
        setLoading(true)
        console.log("search it: ", searchAddress)
        try {
            const _pk = new PublicKey(searchAddress)
            router.push(`../solana/${searchAddress}`)
        } catch {
            console.log("not a solana address")
            setMyNfts([])
            router.push(`../aptos/${searchAddress}`)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <Layout>
                <div className="rounded-lg bg-white px-5 py-6  shadow sm:px-6">
                    <div className='mb-4 pb-4 border-b border-gray-300'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            View a wallet
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <WalletIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder={String(address)}
                                    onChange={(e) => {
                                        setSearchAddress(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch()
                                        }
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                type="button"
                                className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>View</span>
                            </button>
                        </div>
                    </div>


                    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {loading && <><BarLoader color='#000000' /></>}
                        {!loading && myNfts && myNfts.map((file) => (
                            <li key={file.metadata_uri} className="relative">
                                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                    <img src={file.metadata_uri} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                                    <button type="button" className="absolute inset-0 focus:outline-none">
                                        <span className="sr-only">View details for {file.name}</span>
                                    </button>
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Layout>
        </>
    )
}

export default AptosWalletNftViewer