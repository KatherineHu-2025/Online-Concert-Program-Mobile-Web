export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  venue: string;
  rating: number;
  preview: string;
  content: string;
}

const JOURNAL_ENTRIES_KEY = 'journalEntries';

export const getJournalEntries = (): JournalEntry[] => {
  if (typeof window === 'undefined') return [];
  const entries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
  return entries ? JSON.parse(entries) : [];
};

export const addJournalEntry = (entry: JournalEntry): void => {
  if (typeof window === 'undefined') return;
  const entries = getJournalEntries();
  entries.push(entry);
  localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
};

export const updateJournalEntry = (id: string, updatedEntry: JournalEntry): void => {
  if (typeof window === 'undefined') return;
  const entries = getJournalEntries();
  const index = entries.findIndex(entry => entry.id === id);
  
  if (index !== -1) {
    entries[index] = updatedEntry;
    localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
  }
};

export const deleteJournalEntry = (id: string): void => {
  if (typeof window === 'undefined') return;
  const entries = getJournalEntries();
  const updatedEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(updatedEntries));
};

export const getJournalEntryById = (id: string): JournalEntry | null => {
  if (typeof window === 'undefined') return null;
  const entries = getJournalEntries();
  return entries.find(entry => entry.id === id) || null;
}; 