// EDIT THIS PAGE, Home Page

'use client'

import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Navigation from '@/components/navigation';

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Login', href: '/login', current: false },
  { name: 'Sign Up', href: '/signin', current: false },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">

      {/* Navigation */}
      <Navigation currentPath={navigation}/>
      
      {/* Body - items-center TODO: MAKE IMAGE BACKGROUND AND BLUR */ }

      <div className="">
        <div className="mx-auto">
            <img
              alt="Wallpaper of a computer on a blue screen. By Allison Saeng from Upsplash"
              src="https://images.unsplash.com/photo-1714578187218-d1828f5ebd6e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
        </div>
        
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left p-24">
          This is our HomePage.
        </div>
      </div>
    </main>
  );
}