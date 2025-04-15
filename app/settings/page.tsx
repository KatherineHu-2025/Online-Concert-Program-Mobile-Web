'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white p-6 pt-25 bg-[#2B2F3E]">
        <h1 className="text-2xl font-semibold">Interactive Concert Program</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-[#FEFBF4] p-4 pb-24">
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#6B4E5B] rounded-full"></div>
            <div>
              <h2 className="text-xl font-semibold text-[#3B3C50]">Name</h2>
              <Link href="/create-account" className="text-[#3B3C50] underline">
                Create an Account
              </Link>
              <br />
              <Link href="/sign-in" className="text-[#3B3C50] underline">
                Sign in to your Account
              </Link>
            </div>
          </div>
        </div>

        {/* Mode Settings */}
        <div className="space-y-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-[#2B2F3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 15.536A5 5 0 0012 13a5 5 0 00-3.536 2.536m11.072 0A9 9 0 0012 21a9 9 0 00-8.536-5.464M15.536 15.536A9 9 0 0012 3a9 9 0 00-3.536 12.536" />
              </svg>
              <span className="text-[#2B2F3E]">Concert Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B4E5B]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-[#2B2F3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-[#2B2F3E]">Normal Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B4E5B]"></div>
            </label>
          </div>
        </div>

        {/* Saved Concerts Link */}
        <Link href="/saved" className="block">
          <div className="flex items-center justify-between p-4 bg-[#7472B3] rounded-lg">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" 
                  stroke="#DEDDED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg text-[#DEDDED]">Saved Concerts</span>
            </div>
            <svg className="w-6 h-6 text-[#DEDDED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </main>

      {/* Navigation Bar */}
      <Navbar />
    </div>
  );
};

export default Settings; 