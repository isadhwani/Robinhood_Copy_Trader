// Sign In Page

'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

import Navigation from '@/components/navigation';
import {useState} from 'react';
import Carousel from '../testCarousel/page';

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Dashboard', href: '/user_dashboard', current: true }
]

export default function Home() {
  const [accounts, setCopyAccounts] = useState([]);
  const [error, setError] = useState('');

  const fetchCopyAccounts = async () => {
    try {
      //TODO: change if we get a domain
      const response = await fetch('api/copy-profiles');
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
      const data = await response.json();
      setCopyAccounts(data);
    }
    catch(error){
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between bg-dark-theme-2">

      {/* Navigation */}
      <Navigation currentPath={navigation}/>
      
      {/* Body */ }
      {/*}

      <div className="">  
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left p-24 text-white">
          This is our User Dashboard
        </div>
      </div>
      */}
        <div className="p-24 text-white">  
          <h1 className="text-2xl mb-4">User Dashboard</h1>

          <Carousel />
        
          <button 
            onClick={fetchCopyAccounts}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            Fetch Accounts to Copy
          </button>

          {error && <p className="text-red-500 mb-4">{error}</p>}
        
          {accounts && (
            <div>
              <h2 className="text-xl mb-2">Accounts:</h2>
              <pre className="bg-gray-800 p-4 rounded overflow-auto">
                {JSON.stringify(accounts, null, 2)}
              </pre>
            </div>
          )}
        </div>
    </main>
  );
}