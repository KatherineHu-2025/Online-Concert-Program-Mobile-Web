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

export const clearSavedConcerts = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SAVED_CONCERTS_KEY, JSON.stringify([]));
};

export const isConcertSaved = (concertId: string): boolean => {
  if (typeof window === 'undefined') return false;
  const savedConcerts = getSavedConcerts();
  return savedConcerts.some(concert => concert.id === concertId);
}; 