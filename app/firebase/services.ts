import { db } from './config';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

export interface Concert {
  concertType: string;
  date: string;
  location: string;
  title: string;
  performers?: {
    name: string;
    type: string;
    imageUrl?: string;
  }[];
  programs?: {
    composer: string;
    piece: string;
    notes?: string;
  }[];
  customSections?: Record<string, any>;
}

export async function getConcertById(concertId: string): Promise<Concert | null> {
  try {
    const concertRef = doc(db, 'publicEvents', concertId);
    const concertSnap = await getDoc(concertRef);
    
    if (concertSnap.exists()) {
      const data = concertSnap.data();
      // Convert Timestamp to string if it exists
      if (data.date && data.date instanceof Timestamp) {
        data.date = data.date.toDate().toLocaleString();
      }
      return data as Concert;
    } else {
      console.error('No concert found with ID:', concertId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching concert:', error);
    return null;
  }
} 