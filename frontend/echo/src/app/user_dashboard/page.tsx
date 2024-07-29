// User Dashboard

'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

import Navigation from '@/components/navigation';
import { useState } from 'react';
import Carousel from '@/components/carousel';

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Dashboard', href: '/user_dashboard', current: true }
]

export default function Home() {
  const [accounts, setCopyAccounts] = useState<any[]>([]);
  const [error, setError] = useState('');

  const fetchCopyAccounts = async () => {
    try {
      // TODO: change if we get a domain
      const response = await fetch('api/copy-profiles');
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
      const data = await response.json();

      // Ensure data is an array
      let accountsArray = [];
      if (Array.isArray(data)) {
        accountsArray = data;
      } else if (data.portfolios && Array.isArray(data.portfolios)) {
        accountsArray = data.portfolios;
      } else {
        throw new Error('Invalid data format');
      }

      setCopyAccounts(accountsArray);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  const renderPortfolio = (portfolios) => {
    return (
      <div key={portfolios.portfolio_id} className="bg-gray-800 p-4 rounded mb-4">
        <p><strong>ID:</strong> {portfolios.portfolio_id}</p>
        <p><strong>Name:</strong> {portfolios.data.name}</p>
        <p><strong>Account Type:</strong> {portfolios.data.type}</p>
        <img src={portfolios.data.image} alt={portfolios.data.name} className="rounded-full w-36 h-36 object-cover mx-auto" />
        <p><strong>Percentages:</strong> {JSON.stringify(portfolios.data.percentages)}</p>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col justify-between bg-dark-theme-2">
      {/* Navigation */}
      <Navigation currentPath={navigation} />
      
      {/* Body */}
      <div className="p-24 text-white">  
        <h1 className="text-2xl mb-4">User Dashboard</h1>

        {/* Need to figure out how to add JSON to carousel */}
        <Carousel />
        
        <button 
          onClick={fetchCopyAccounts}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Fetch Accounts to Copy
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {accounts.length > 0 && (
          <div>
            <h2 className="text-xl mb-2">Accounts:</h2>
            {accounts.map(renderPortfolio)}
          </div>
        )}
      </div>
    </main>
  );
}