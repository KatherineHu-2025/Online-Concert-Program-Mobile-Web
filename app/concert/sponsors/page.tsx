'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function SponsorsPage() {
  const sponsors = [
    {
      title: 'Knobloch Campus Center',
      description: 'The 600+ seat proscenium theatre is housed within the Knobloch Campus Center along with the Alvarez College Union, creating a seamless relationship between academics, art, entertainment and college community life. For current performances, visit the ticket office or review the seating chart.'
    },
    {
      title: 'Duke Family Performance Hall',
      description: 'The Duke Family Performance Hall was made possible by a gift from The Duke Endowment, a private foundation that serves the people of North and South Carolina by supporting selected programs in higher education, health care, children\'s welfare and spiritual Life. The Duke Endowment has been a major benefactor to the college during an association that has endured more than 75 years.'
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
        <img
          src="/orchestra-bg.jpg"
          alt="Orchestra performing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2D2F3D] opacity-60"></div>
        
        {/* Page Title */}
        <div className="relative z-10 h-full flex items-end pb-3">
          <h2 className="text-white text-2xl font-bold px-4">
            Sponsors
          </h2>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="bg-[#A5A88F]/80 rounded-lg p-6 text-white"
            >
              <h3 className="font-bold text-lg mb-2">{sponsor.title}</h3>
              <p className="text-white/90 leading-relaxed">
                {sponsor.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
} 