'use client';

import React from 'react';
import Navbar from '../components/Navbar';

export default function Journal() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#2B2F3E] mb-4">Journal</h1>
          <p className="text-[#2B2F3E] text-lg">
            This feature is currently under construction! Come back another time to test it out!
          </p>
        </div>
      </div>
      <Navbar />
    </main>
  );
} 