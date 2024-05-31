import { db } from '../firebaseConfig';
import { collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name:string
};

export const addToWatchlist = async (userId: string, movie: Movie) => {
  try {
    const userWatchlistRef = collection(db, `users/${userId}/watchlist`);
    await addDoc(userWatchlistRef, movie);
    console.log("added movie")
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
};

export const removeFromWatchlist = async (userId: string, movieId: number) => {
  try {
    const userWatchlistRef = collection(db, `users/${userId}/watchlist`);
    const snapshot = await getDocs(userWatchlistRef);
    const docId = snapshot.docs.find((doc) => doc.data().id === movieId)?.id;
    if (docId) {
      await deleteDoc(doc(userWatchlistRef, docId));
    }
  } catch (error) {
    console.error('Error removing from watchlist:', error);
  }
};

export const fetchWatchlist = async (userId: string) => {
  try {
    const userWatchlistRef = collection(db, `users/${userId}/watchlist`);
    const watchlistSnapshot = await getDocs(userWatchlistRef);
    const watchlistData = watchlistSnapshot.docs.map((doc) => doc.data() as Movie);
    return watchlistData;
  } catch (error) {
    console.error('Failed to fetch watchlist:', error);
  } 
};

