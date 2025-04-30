import { verifyConcertsExist } from '../firebase/services';

export interface SavedConcert {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor?: string;
  color?: string;
}

const SAVED_CONCERTS_KEY = 'savedConcerts';
const SCANNED_CONCERTS_KEY = 'scannedConcerts';
const LAST_SYNC_KEY = 'lastConcertSync';

export const getScannedConcerts = (): SavedConcert[] => {
  if (typeof window === 'undefined') return [];
  const scannedConcerts = localStorage.getItem(SCANNED_CONCERTS_KEY);
  return scannedConcerts ? JSON.parse(scannedConcerts) : [];
};

export const addScannedConcert = (concert: SavedConcert): void => {
  if (typeof window === 'undefined') return;
  const scannedConcerts = getScannedConcerts();
  if (!scannedConcerts.some(saved => saved.id === concert.id)) {
    scannedConcerts.push(concert);
    localStorage.setItem(SCANNED_CONCERTS_KEY, JSON.stringify(scannedConcerts));
  }
};

export const getSavedConcerts = (): SavedConcert[] => {
  if (typeof window === 'undefined') return [];
  const savedConcerts = localStorage.getItem(SAVED_CONCERTS_KEY);
  return savedConcerts ? JSON.parse(savedConcerts) : [];
};

export const saveConcert = (concert: SavedConcert): void => {
  if (typeof window === 'undefined') return;
  const savedConcerts = getSavedConcerts();
  if (!savedConcerts.some(saved => saved.id === concert.id)) {
    savedConcerts.push(concert);
    localStorage.setItem(SAVED_CONCERTS_KEY, JSON.stringify(savedConcerts));
  }
};

export const unsaveConcert = (concertId: string): void => {
  if (typeof window === 'undefined') return;
  const savedConcerts = getSavedConcerts();
  const updatedConcerts = savedConcerts.filter(concert => concert.id !== concertId);
  localStorage.setItem(SAVED_CONCERTS_KEY, JSON.stringify(updatedConcerts));
};

export const removeScannedConcert = (concertId: string): void => {
  if (typeof window === 'undefined') return;
  const scannedConcerts = getScannedConcerts();
  const updatedConcerts = scannedConcerts.filter(concert => concert.id !== concertId);
  localStorage.setItem(SCANNED_CONCERTS_KEY, JSON.stringify(updatedConcerts));
  // Also remove from saved concerts if it exists there
  if (isConcertSaved(concertId)) {
    unsaveConcert(concertId);
  }
};

export const clearSavedConcerts = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SAVED_CONCERTS_KEY, JSON.stringify([]));
};

export const isConcertSaved = (concertId: string): boolean => {
  if (typeof window === 'undefined') return false;
  const savedConcerts = getSavedConcerts();
  return savedConcerts.some(concert => concert.id === concertId);
};

export const getLastSyncTime = (): number => {
  if (typeof window === 'undefined') return 0;
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  return lastSync ? parseInt(lastSync, 10) : 0;
};

export const setLastSyncTime = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
};

// New function to sync concerts with Firebase
export const syncConcertsWithFirebase = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    const scannedConcerts = getScannedConcerts();
    const concertIds = scannedConcerts.map(concert => concert.id);
    
    // Get list of concerts that still exist in Firebase
    const existingConcerts = await verifyConcertsExist(concertIds);
    
    // Remove concerts that no longer exist in Firebase
    const deletedConcerts = concertIds.filter(id => !existingConcerts.includes(id));
    deletedConcerts.forEach(id => removeScannedConcert(id));
    
    // Update last sync time
    setLastSyncTime();
  } catch (error) {
    console.error('Error syncing concerts:', error);
  }
}; 