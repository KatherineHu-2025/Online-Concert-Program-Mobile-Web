import { db } from './config';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';

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
    duration?: string;
  }[];
  customSections?: Record<string, string | number | boolean | null>;
  duration?: string;
}

function calculateTotalDuration(programs: Concert['programs']): string {
  if (!programs) return '--';
  
  let totalSeconds = 0;
  
  programs.forEach(program => {
    if (program.duration) {
      // Handle MM:SS format
      const [minutes, seconds] = program.duration.split(':').map(Number);
      if (!isNaN(minutes) && !isNaN(seconds)) {
        totalSeconds += (minutes * 60) + seconds;
      }
    }
  });
  
  if (totalSeconds === 0) return '--';
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours} hr ${minutes} min ${seconds} sec`;
  }
  if (minutes > 0) {
    return `${minutes} min ${seconds} sec`;
  }
  return `${seconds} sec`;
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
      // Calculate total duration from program durations
      if (data.programs) {
        data.duration = calculateTotalDuration(data.programs);
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


// export async function updateConcert(concertId: string, data: Partial<Concert>): Promise<void> {
//   try {
//     const concertRef = doc(db, 'publicEvents', concertId);
//     await updateDoc(concertRef, data);
//   } catch (error) {
//     console.error('Error updating concert:', error);
//     throw error;

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