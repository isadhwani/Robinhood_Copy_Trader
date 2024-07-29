// User Dashboard

'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

import React from 'react';


import Navigation from '@/components/navigation';
import { useState } from 'react';
import Carousel from '@/components/carousel';
import { useEffect } from 'react';

import { Portfolio, PortfoliosData } from '@/types/types';

{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Dashboard', href: '/user_dashboard', current: true }
]

export default function Home() {
  const [accounts, setCopyAccounts] = useState<Portfolio[]>([]);
  const [userHoldings, setUserHoldings] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');
  const [purchaseMessages, setPurchaseMessages] = useState<string[]>([]);


  useEffect(() => {
    fetchCopyAccounts();
  }, []);

  const fetchCopyAccounts = async () => {
    try {
      const response = await fetch('api/copy-profiles');
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
      const data: PortfoliosData = await response.json();

      setCopyAccounts(data.portfolios);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  const fetchUserHoldings = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      const response = await fetch(`api/holdings?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user holdings');
      }
      const data = await response.json();
      setUserHoldings(data.holdings.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const renderHoldings = (holdings) => {
    return (
      <p><strong>{holdings.asset_code}</strong>: {holdings.total_quantity}</p>
    );
  };

  const executeTrade = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      console.log('User ID:', userId);
      console.log('Account to copy:', selectedProfileId);
      console.log('Funds:', tradeAmount);

      const response = await fetch('api/execute-trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(userId, 10), // Ensure it's a number
          account_to_copy: selectedProfileId,
          funds: parseFloat(tradeAmount),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to execute trade');
      }
      const data = await response.json();
      alert('Trade executed successfully!');
      setPurchaseMessages(data.purchase_messages || []);
      console.log(purchaseMessages);
      fetchUserHoldings();
    }
    catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const renderPortfolio = (portfolio: Portfolio) => {
    return (
      <div key={portfolio.portfolio_id} className="bg-gray-800 p-4 rounded mb-4">
        <p><strong>ID:</strong> {portfolio.portfolio_id}</p>
        <p><strong>Name:</strong> {portfolio.name}</p>
        <p><strong>Account Type:</strong> {portfolio.type}</p>
        <img src={portfolio.image} alt={portfolio.name} className="rounded-full w-36 h-36 object-cover mx-auto" />
        <p><strong>Percentages:</strong> {JSON.stringify(portfolio.percentages)}</p>
      </div>
    );
  };


  return (
    <main className="flex min-h-screen flex-col justify-between bg-dark-theme-2">
      {/* Navigation */}
      <Navigation currentPath={navigation} />

      {/* Body */}
      {/*}

      <div className="">  
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left p-24 text-white">
          This is our User Dashboard
        </div>
      </div>
      */}
      <div className="p-24 text-white">
        <h1 className="text-2xl mb-4">User Dashboard</h1>


        <form onSubmit={executeTrade} className="mb-8">
          <h2 className="text-xl mb-2">Execute Trade</h2>
          <div className="mb-4">
            <label htmlFor="profileId" className="block mb-2">Account ID to Copy:</label>
            <input
              id="profileId"
              type="text"
              value={selectedProfileId}
              onChange={(e) => setSelectedProfileId(e.target.value)}
              className="w-full p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tradeAmount" className="block mb-2">Amount to Trade:</label>
            <input
              id="tradeAmount"
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              className="w-full p-2 text-black"
              required
            />
          </div>
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
            Execute Trade
          </button>

          {purchaseMessages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl mb-2">Purchase Details:</h3>
              <ul className="list-disc pl-5">
                {purchaseMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          )}
        </form>


        {/*
        <button
          onClick={fetchCopyAccounts}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Fetch Accounts to Copy
        </button>
        */}

        <button
          onClick={fetchUserHoldings}
          className="bg-green-500 text-white p-2 rounded mb-4"
        >
          View My Holdings
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {userHoldings && (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <h2 className="text-xl mb-2">Your Holdings:</h2>
            {userHoldings.map(renderHoldings)}
          </div>
        )}

        <Carousel portfolios={accounts} />

        {accounts.length > 0 && (
          <div>
            <h2 className="text-xl mb-2">Accounts:</h2>
            {accounts.map((portfolio) => renderPortfolio(portfolio))}
          </div>
        )}

      </div>
    </main>
  );
}