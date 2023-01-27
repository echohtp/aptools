/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useState, useEffect, useMemo, Fragment } from "react";
import WalletSelector from '@/components/WalletSelector';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useWallet as solanaUseWallet } from '@solana/wallet-adapter-react';
import { useWallet as aptosUseWallet } from '@aptos-labs/wallet-adapter-react';
import {
  ChevronDownIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon
} from '@heroicons/react/20/solid'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: any) {
  const [walletOpen, setWalletOpen] = useState<boolean>(false)
  const solanaWallet = solanaUseWallet()
  const aptosWallet = aptosUseWallet()
  const connected = solanaWallet.connected || aptosWallet.connected

  const debug = () =>{
    console.log("Solana: ", solanaWallet.connected)
    console.log("Aptos: ", aptosWallet.connected)
  }

  debug()

  return (
    <>
      <Head>
        <title>0xBanana&apos;s Tools</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                        </div>
                        <div className="block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            <a>
                              {!solanaWallet.connected && !aptosWallet.connected && <>
                                <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => {
                                    console.log("open it")
                                    setWalletOpen(true)
                                  }}>Connect</button>
                                <WalletSelector open={walletOpen} setOpen={setWalletOpen} />
                              </>}
                              {connected && <>
                                <Menu as="div" className="relative inline-block text-left">
                                  <div>
                                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                      Disconnect
                                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                  </div>

                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div className="py-1">
                                        {solanaWallet.connected &&
                                          <Menu.Item >
                                            {({ active }) => (
                                              <a
                                                onClick={async ()=>{
                                                  await solanaWallet.disconnect()
                                                }}
                                                href="#"
                                                className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'group flex items-center px-4 py-2 text-sm'
                                                )}
                                              >
                                                <PencilSquareIcon
                                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                  aria-hidden="true"
                                                />
                                                Solana
                                              </a>
                                            )}
                                          </Menu.Item>
                                        }
                                        {aptosWallet.connected &&
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                onClick={async ()=>{
                                                    await aptosWallet.disconnect()
                                                }}
                                                className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'group flex items-center px-4 py-2 text-sm'
                                                )}
                                              >
                                                <DocumentDuplicateIcon
                                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                  aria-hidden="true"
                                                />
                                                Aptos
                                              </a>
                                            )}
                                          </Menu.Item>
                                        }
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu></>}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">&nbsp;</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            {children}
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}