'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

export default function ConcertPage() {
  return (
    <div className="min-h-screen bg-[#FEFBF4] font-lora">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/" className="text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>

      {/* Header with background image */}
      <div className="relative h-[200px]">
        <Image
          src="/orchestra-bg.jpg"
          alt="Orchestra performing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#2D2F3D] opacity-60"></div>
        
        {/* Concert Title */}
        <div className="relative z-10 h-full flex items-end pb-3">
          <h2 className="text-white text-2xl font-bold px-4">
            Holiday Gala
          </h2>
        </div>
      </div>

      {/* Concert Details */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xl">12/4/2024 5:30 & 8:00pm</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700 mb-8">
          <MapPinIcon className="h-6 w-6" />
          <span className="text-xl">Duke Family Performance Hall</span>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Link href="/concert/performers" className="block">
            <button className="w-full py-2.5 px-6 bg-[#6D4C5E] text-white rounded-lg text-xl font-semibold">
              Performers
            </button>
          </Link>
          
          <Link href="/concert/program" className="block">
            <button className="w-full py-2.5 px-6 bg-[#E5EFE7] text-gray-800 rounded-lg text-xl font-semibold">
              Program
            </button>
          </Link>
          
          <Link href="/concert/sponsors" className="block">
            <button className="w-full py-2.5 px-6 bg-[#A5A88F] text-white rounded-lg text-xl font-semibold">
              Sponsors
            </button>
          </Link>
        </div>
      </div>

      <Navbar />
    </div>
  );
} 