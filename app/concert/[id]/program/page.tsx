'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { getConcertById } from '../../../firebase/services';
import { usePathname } from 'next/navigation';

interface ProgramItemType {
  composer: string;
  notes: string;
  piece: string;
  movements?: string[];
  years?: string;
}

interface ConcertType {
  title: string;
  programs: ProgramItemType[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  composer: string;
  notes: string;
}

const NotesModal: React.FC<ModalProps> = ({ isOpen, onClose, title, composer, notes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#2D2F3D] mb-2">{title}</h3>
              <p className="text-gray-600">{composer}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="prose max-w-none overflow-y-auto whitespace-pre-wrap">
            {notes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProgramPage() {
  const [concert, setConcert] = useState<ConcertType | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<ProgramItemType | null>(null);
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

      {/* Program Section */}
      <div className="px-4 pt-6 pb-24 max-w-2xl mx-auto">
        <h2 className="text-[#2D2F3D] text-3xl font-bold mb-8 text-center">Program</h2>
        <div className="bg-[#E5EFE7] rounded-2xl overflow-hidden">
          <div className="p-8 min-h-[calc(100vh-24rem)] overflow-y-auto">
            {concert.programs && concert.programs.length > 0 ? (
              concert.programs.map((item: ProgramItemType, index: number) => (
                <div key={index} className="mb-12 last:mb-0">
                  {item.piece === "Intermission" ? (
                    <div className="text-center italic text-xl tracking-widest my-16">
                      I n t e r m i s s i o n
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedPiece(item)}
                      className="w-full text-left group"
                    >
                      <div className="flex justify-between items-start gap-8 mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium mb-1">
                            {item.piece}
                          </h3>
                          {item.movements && item.movements.map((movement, idx) => (
                            <div key={idx} className="text-gray-600 pl-6 mb-1 italic">
                              {movement}
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{item.composer}</div>
                          {item.years && (
                            <div className="text-gray-600 text-sm">
                              ({item.years})
                            </div>
                          )}
                        </div>
                      </div>
                      {item.notes && (
                        <div className="text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          View program notes →
                        </div>
                      )}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 py-8">
                No program items available
              </div>
            )}
          </div>
        </div>
      </div>

      <NotesModal
        isOpen={selectedPiece !== null}
        onClose={() => setSelectedPiece(null)}
        title={selectedPiece?.piece || ''}
        composer={selectedPiece?.composer || ''}
        notes={selectedPiece?.notes || ''}
      />

      <Navbar />
    </div>
  );
} 