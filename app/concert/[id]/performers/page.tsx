'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import PerformerCard from '../../../components/PerformerCard';
import { getConcertById } from '../../../firebase/services';
import { usePathname } from 'next/navigation';

interface PerformerType {
  name: string;
  type: string;
  imageUrl?: string;
  description?: string;
}

interface ConcertType {
  title: string;
  performers: PerformerType[];
  performanceGroup?: string;
}

export default function PerformersPage() {
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

      {/* Performers Section */}
      <div className="px-4 py-6">
        <h2 className="text-[#2D2F3D] text-2xl font-bold mb-6">Performers</h2>
        <div>
          {concert.performers && concert.performers.map((performer: PerformerType, index: number) => (
            <PerformerCard
              key={index}
              name={performer.name}
              type={performer.type}
              imageUrl={performer.imageUrl || '/performer-placeholder.jpg'}
              description={performer.description || `${performer.name} - ${performer.type}`}
            />
          ))}
          {concert.performanceGroup && (
            <PerformerCard
              key="group"
              name={concert.performanceGroup}
              type="group"
              imageUrl="/orchestra-placeholder.jpg"
              description={`Performance by ${concert.performanceGroup}`}
            />
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
} 