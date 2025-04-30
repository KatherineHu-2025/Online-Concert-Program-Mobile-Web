import { db } from './config';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

export interface Concert {
  concertType: string;
  date: string;
  location: string;
  title: string;
  color?: string;
  circleColor?: string;
  createBy?: string;
  performanceGroup?: string;
  performanceGroupBio?: string;
  sponsorText?: string;
  performers?: {
    name: string;
    type: string;
    imageUrl?: string;
    bio?: string;
    role?: string;
  }[];
  programs?: {
    composer: string;
    piece: string;
    notes?: string;
  }[];
  customSections?: Record<string, string | number | boolean | null>;
  duration?: string;
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

// New function to verify multiple concerts exist
export async function verifyConcertsExist(concertIds: string[]): Promise<string[]> {
  try {
    const existingConcerts: string[] = [];
    
    // Process in batches of 10 to avoid too many concurrent requests
    for (let i = 0; i < concertIds.length; i += 10) {
      const batch = concertIds.slice(i, i + 10);
      const promises = batch.map(async (id) => {
        const concertRef = doc(db, 'publicEvents', id);
        const concertSnap = await getDoc(concertRef);
        if (concertSnap.exists()) {
          existingConcerts.push(id);
        }
      });
      await Promise.all(promises);
    }
    
    return existingConcerts;
  } catch (error) {
    console.error('Error verifying concerts:', error);
    return [];
  }
} 