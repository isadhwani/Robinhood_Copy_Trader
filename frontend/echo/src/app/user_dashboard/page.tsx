// Sign In Page
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Dashboard', href: '/user_dashboard', current: true }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-dark-theme-2">

      {/* Navigation */}
      <Disclosure as="nav" className="bg-dark-theme">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            { /* logo */ }
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  alt="ECHO"
                  src="https://cdn.discordapp.com/attachments/907803366908903464/1263650447961493534/ECHOLOGO_proto_A.png?ex=669b01b0&is=6699b030&hm=b5757ab689eaa06372ecb95a90ab87e69648fd6bcab4a7475fcd2633e67ea31a&"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            { /* for larger display */ }
            <div className="hidden sm:ml-6 sm:block">
              <div className="absolute right-0 flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-slate-700 text-zinc-200' : 'text-zinc-400 hover:bg-zinc-400 hover:text-dark-theme',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      { /* for mobile display */ }
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-slate-700 text-zinc-200' : 'text-zinc-400 hover:bg-zinc-400 hover:text-dark-theme',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
      
      {/* Body */ }

      <div className="">  
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left p-24 text-white">
          This is our User Dashboard
        </div>
      </div>
    </main>
  );
}