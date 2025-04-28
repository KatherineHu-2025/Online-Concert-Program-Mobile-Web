'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import { getConcertById } from '../../../firebase/services';
import { usePathname } from 'next/navigation';

interface ConcertType {
  title: string;
  sponsorText?: string;
}

export default function SponsorsPage() {
  const [concert, setConcert] = useState<ConcertType | null>(null);
  const pathname = usePathname();
  const concertId = pathname.split('/')[2];

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const concertData = await getConcertById(concertId);
        setConcert(concertData as ConcertType);
      } catch (error) {
        console.error('Error fetching concert:', error);
      }
    };

    if (concertId) {
      fetchConcert();
    }
  }, [concertId]);

  if (!concert) {
    return (
      <div className="min-h-screen bg-[#FEFBF4] font-lora flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFBF4] font-lora">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href={`/concert/${concertId}`} className="text-xl">
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
            {concert.title}
          </h2>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="px-4 py-6">
        <h2 className="text-[#2D2F3D] text-2xl font-bold mb-6">Sponsors</h2>
        <div className="bg-[#334934] rounded-2xl p-6 text-white">
          {concert.sponsorText ? (
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {concert.sponsorText}
            </p>
          ) : (
            <p className="text-lg text-center italic">
              No sponsor information available
            </p>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
} 