'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import PerformerCard from '../../components/PerformerCard';

export default function PerformersPage() {
  const performers = [
    {
      name: 'Davidson Orchestra',
      type: 'group',
      imageUrl: '/orchestra-placeholder.jpg',
      description: "Winners of The American Prize in Orchestral Performance 2018, college division, The Davidson College Symphony Orchestra (DCSO) is an ensemble for students of all backgrounds to rehearse and perform in a collaborative atmosphere while honing their technical skills and broadening their musical knowledge and experience.\n\nApproximately 95% of the ensemble is composed of non-music majors, with no special priority given to music majors. This diverse body of students enhances their artistry in conjunction with their various perspectives and academic interests, creating an engaging and artistically stimulating rehearsal atmosphere.\n\nAs an auditioned ensemble averaging 60 student musicians, the DCSO performs a diverse range of orchestral repertoire from the Baroque through the present, featuring works by living composers each season. The orchestra rehearses twice weekly (Mondays and Wednesdays from 4:30-5:45 p.m.)"
    },
    {
      name: 'Davidson Appalachian Ensemble',
      type: 'group',
      imageUrl: '/appalachian-placeholder.jpg',
      description: "The Davidson Appalachian Ensemble is dedicated to the performance and preservation of traditional Appalachian music. Founded in 2010, this dynamic group brings together students passionate about folk music and cultural heritage.\n\nThe ensemble performs a variety of traditional instruments including fiddle, banjo, guitar, mandolin, and dulcimer. Their repertoire includes both instrumental tunes and songs that reflect the rich musical heritage of the Appalachian region.\n\nMembers of the ensemble regularly participate in workshops and collaborate with visiting artists to deepen their understanding of Appalachian music traditions and performance practices."
    },
    {
      name: 'Davidson Jazz Ensemble',
      type: 'group',
      imageUrl: '/jazz-placeholder.jpg',
      description: "The Davidson Jazz Ensemble exemplifies the college's commitment to musical excellence and creative expression. This dynamic group explores various jazz styles from traditional swing to contemporary fusion.\n\nComprised of talented student musicians from diverse academic backgrounds, the ensemble provides opportunities for improvisation and artistic growth. Regular performances feature both classic jazz standards and innovative original compositions.\n\nThe ensemble frequently collaborates with guest artists and participates in jazz festivals, offering students valuable performance experience and networking opportunities in the jazz community."
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
        
        {/* Concert Title */}
        <div className="relative z-10 h-full flex items-end pb-3">
          <h2 className="text-white text-2xl font-bold px-4">
            Holiday Gala
          </h2>
        </div>
      </div>

      {/* Performers Section */}
      <div className="px-4 py-6">
        <h2 className="text-[#2D2F3D] text-2xl font-bold mb-6">Performers</h2>
        <div>
          {performers.map((performer, index) => (
            <PerformerCard
              key={index}
              name={performer.name}
              type={performer.type}
              imageUrl={performer.imageUrl}
              description={performer.description}
            />
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
} 