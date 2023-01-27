/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useState, useEffect, useMemo } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  Bars4Icon,
  CalendarIcon,
} from '@heroicons/react/24/outline'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const items = [
  {
    title: 'Create Collection',
    description: 'Create a new NFT Collection',
    icon: Bars4Icon,
    background: 'bg-pink-500',
  },
  {
    title: 'Create NFT',
    description: 'Create a brand new NFT',
    icon: CalendarIcon,
    background: 'bg-yellow-500',
  }
]

const navigation: any[] = [
//   { name: 'Home', href: '/', current: true },
  // { name: 'Team', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
  // { name: 'Reports', href: '#', current: false },
]
const userNavigation: any[] = [
  // { name: 'Your Profile', href: '#' },
  // { name: 'Settings', href: '#' },
  // { name: 'Sign out', href: '#' },
]



export default function Layout({ children }: any) {
    return (
        <>
          <Head>
            <title>0xBanana&apos; Aptos Tools</title>
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
                            <div className="hidden md:block">
                              <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                      item.current
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                      'px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                  >
                                    {item.name}
                                  </a>
                                ))}
                                <a>
                                    <WalletSelector/>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                      <div className="space-y-1 px-2 py-3 sm:px-3">
                        {navigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'block px-3 py-2 rounded-md text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                      <div className="border-t border-gray-700 pt-4 pb-3">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                          </div>
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          {userNavigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </div>
                      </div>
                    </Disclosure.Panel>
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