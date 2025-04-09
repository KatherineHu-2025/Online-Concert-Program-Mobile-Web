import { Concert } from '../firebase/services';

export interface SavedConcert extends Concert {
  id: string;
  scannedAt: string;
}

const STORAGE_KEY = 'saved_concerts';

export function getSavedConcerts(): SavedConcert[] {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveConcert(id: string, concert: Concert): void {
  if (typeof window === 'undefined') return;
  
  const savedConcerts = getSavedConcerts();
  
  // Check if concert already exists
  if (savedConcerts.some(c => c.id === id)) return;
  
  const newConcert: SavedConcert = {
    ...concert,
    id,
    scannedAt: new Date().toISOString()
  };
  
  savedConcerts.push(newConcert);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedConcerts));
}

export function removeConcert(id: string): void {
  if (typeof window === 'undefined') return;
  
  const savedConcerts = getSavedConcerts();
  const filtered = savedConcerts.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
} 