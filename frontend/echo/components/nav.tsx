import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Login', href: '/login', current: true },
  { name: 'Sign Up', href: '/signin', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


function Navigation({ imageUrl, imageAlt, title, message }) {
    return (        


      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="shrink-0">
        <img className="h-12 w-12" src={imageUrl.src} alt={imageAlt}>
      </div>
      <div>
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-slate-500">{message}</p>
      </div>
    </div>
    )
  }