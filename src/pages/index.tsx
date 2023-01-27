import Layout from '@/components/Layout'

import {
  Bars4Icon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const items = [
  {
    title: 'Create Collection',
    description: 'Create a new NFT Collection',
    icon: Bars4Icon,
    background: 'bg-pink-500',
    href: "/create/collection"
  },
  {
    title: 'Create NFT',
    description: 'Create a brand new NFT',
    icon: CalendarIcon,
    background: 'bg-yellow-500',
    href: "/create/nft"
  }
]

export default function Home() {
  return (
    <>
      <Layout>
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Tools</h2>
            <p className="mt-1 text-sm text-gray-500">
              Enjoy these tools, get started by selecting a something from the options below.
            </p>
            <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2">
              {items.map((item, itemIdx) => (
                <Link href={item.href} key={itemIdx}>
                <li className="flow-root">
                  <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div
                      className={classNames(
                        item.background,
                        'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                      )}
                    >
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <a href="#" className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <span>{item.title}</span>
                          <span aria-hidden="true"> &rarr;</span>
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </li>
                </Link>
              ))}
            </ul>
            <div className="mt-4 flex">
              <a href="https://twitter.com/0xbanana" target={"_blank"} rel="noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Send me feedback on twitter
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
