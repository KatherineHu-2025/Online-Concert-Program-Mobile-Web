'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import ProgramItem from '../../components/ProgramItem';

export default function ProgramPage() {
  const programItems = [
    {
      title: 'Sleigh Ride',
      composer: 'Leroy Anderson',
      years: '1908-1975'
    },
    {
      title: 'Auld Lang Syne',
      composer: 'Robert Burns',
      years: '1759-1796'
    },
    {
      title: 'Intermission',
      composer: '',
      years: ''
    },
    {
      title: 'Symphony No. 9',
      composer: 'Ludwig van Beethoven',
      years: '1770-1827'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FEFBF4] font-lora">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/concert" className="text-xl">
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

      {/* Program Section */}
      <div className="px-4 pt-6 pb-24">
        <h2 className="text-[#2D2F3D] text-2xl font-bold mb-6">Program</h2>
        <div className="bg-[#E5EFE7] rounded-2xl overflow-hidden">
          <div className="p-6 min-h-[calc(100vh-24rem)] overflow-y-auto">
            {programItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.title === 'Intermission' ? (
                  <div className="py-8 text-center italic text-gray-800 text-lg">
                    {item.title}
                  </div>
                ) : (
                  <ProgramItem
                    title={item.title}
                    composer={item.composer}
                    years={item.years}
                    isLast={index === programItems.length - 1}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
} 