'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Navbar from '../../components/Navbar';
import { Concert, getConcertById } from '../../firebase/services';

export default function ConcertPage() {
  const params = useParams();
  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConcert() {
      if (params.id) {
        console.log('Fetching concert with ID:', params.id);
        try {
          const concertData = await getConcertById(params.id as string);
          console.log('Concert data:', concertData);
          if (concertData) {
            setConcert(concertData);
          } else {
            console.error('No concert found with ID:', params.id);
            setError('Concert not found');
          }
        } catch (err) {
          console.error('Error fetching concert:', err);
          setError('Failed to load concert information');
        }
      }
      setLoading(false);
    }

    fetchConcert();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-[#2B2F3E]">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Loading...</h1>
          </div>
        </div>
        <Navbar />
      </main>
    );
  }

  if (error || !concert) {
    return (
      <main className="min-h-screen flex flex-col bg-[#2B2F3E]">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Concert Not Found</h1>
            <p className="text-[#E8D1C5] text-lg">
              {error || "The concert you&apos;re looking for doesn&apos;t exist."}
            </p>
          </div>
        </div>
        <Navbar />
      </main>
    );
  }

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
            {concert.title}
          </h2>
        </div>
      </div>

      {/* Concert Details */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xl">{
            (() => {
              const dateObj = new Date(concert.date);
              return dateObj.toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
            })()
          }</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700 mb-8">
          <MapPinIcon className="h-6 w-6" />
          <span className="text-xl">{concert.location}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Link href={`/concert/${params.id}/performers`} className="block">
            <button className="w-full py-2.5 px-6 bg-[#734053] text-white rounded-2xl text-xl font-semibold">
              Performers
            </button>
          </Link>
          
          <Link href={`/concert/${params.id}/program`} className="block">
            <button className="w-full py-2.5 px-6 bg-[#E5EFE7] text-gray-800 rounded-2xl text-xl font-semibold">
              Program
            </button>
          </Link>
          
          <Link href={`/concert/${params.id}/sponsors`} className="block">
            <button className="w-full py-2.5 px-6 bg-[#334934] text-white rounded-2xl text-xl font-semibold">
              Sponsors
            </button>
          </Link>
        </div>
      </div>

      <Navbar />
    </div>
  );
} 