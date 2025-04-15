'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJournalEntryById, JournalEntry, deleteJournalEntry, updateJournalEntry } from '../../utils/journalStorage';
import Navbar from '../../components/Navbar';

export default function JournalEntryPage() {
  const params = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedVenue, setEditedVenue] = useState('');
  const [editedRating, setEditedRating] = useState(0);

  useEffect(() => {
    if (params.id) {
      const journalEntry = getJournalEntryById(params.id as string);
      setEntry(journalEntry);
      if (journalEntry) {
        setEditedContent(journalEntry.content);
        setEditedTitle(journalEntry.title);
        setEditedDate(journalEntry.date);
        setEditedVenue(journalEntry.venue);
        setEditedRating(journalEntry.rating);
      }
    }
  }, [params.id]);

  const handleDelete = () => {
    if (entry && confirm('Are you sure you want to delete this journal entry?')) {
      deleteJournalEntry(entry.id);
      router.push('/journal');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (entry) {
      const updatedEntry = {
        ...entry,
        title: editedTitle,
        date: editedDate,
        venue: editedVenue,
        rating: editedRating,
        content: editedContent,
        preview: editedContent.slice(0, 100) + (editedContent.length > 100 ? '...' : '')
      };
      updateJournalEntry(entry.id, updatedEntry);
      setEntry(updatedEntry);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (entry) {
      setEditedContent(entry.content);
      setEditedTitle(entry.title);
      setEditedDate(entry.date);
      setEditedVenue(entry.venue);
      setEditedRating(entry.rating);
    }
    setIsEditing(false);
  };

  if (!entry) {
    return (
      <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
        <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
          <Link href="/journal" className="text-xl">
            ←
          </Link>
          <h1 className="text-lg font-bold">
            Journal Entry
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Entry not found</p>
        </div>
        <Navbar />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/journal" className="text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold">
          Journal Entry
        </h1>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col mb-6">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold text-[#2D2F3D] mb-2 p-2 border border-gray-300 rounded-lg"
                />
                <div className="flex mb-2">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setEditedRating(index + 1)}
                      className="text-2xl text-[#7472B3]"
                    >
                      {index < editedRating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
                <input
                  type="datetime-local"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="text-gray-600 mb-2 p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={editedVenue}
                  onChange={(e) => setEditedVenue(e.target.value)}
                  className="text-gray-600 p-2 border border-gray-300 rounded-lg"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#2D2F3D] mb-2">{entry.title}</h2>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="text-2xl text-[#7472B3]">
                      {index < entry.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">
                  {new Date(entry.date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
                <p className="text-gray-600">{entry.venue}</p>
              </>
            )}
            <div className="flex gap-2 mt-2">
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="text-[#7472B3] hover:text-[#5F5D94] transition-colors"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="bg-[#7472B3] rounded-lg p-6 shadow-sm">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg h-48 bg-white text-[#2D2F3D]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-[#FEFBF4] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#FEFBF4] text-[#7472B3] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-[#FEFBF4]">{entry.content}</p>
            )}
          </div>
        </div>
      </div>

      <Navbar />
    </main>
  );
} 