// Sign In Page

'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

import Navigation from '../../components/navigation';

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Dashboard', href: '/user_dashboard', current: true }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-dark-theme-2">

      {/* Navigation */}
      <Navigation currentPath={navigation}/>
      
      {/* Body */ }

      <div className="">  
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left p-24 text-white">
          This is our User Dashboard
        </div>
      </div>
    </main>
  );
}