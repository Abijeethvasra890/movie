
import React, { createContext, useContext, useEffect, useState } from 'react';
import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from '../utils/WatchList';
import { useUser } from './UserContext';

type WatchlistContextType = {
  watchlist: Movie[];
  loading: boolean;
  addMovieToWatchlist: (movie: Movie) => void;
  removeMovieFromWatchlist: (movieId: number) => void;
};


type Movie = {
    id: number;
    backdrop_path: string;
    title: string;
    overview: string;
    poster_path: string;
    name:string;
  };

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    const handleFetchWatchlist = async () => {
      if (!user) return;
      try {
        const watchlistData = await fetchWatchlist(user.uid);
        setWatchlist(watchlistData || []);
      } catch (error) {
        console.error('Failed to fetch watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    handleFetchWatchlist();
  }, [user, watchlist]);

  const addMovieToWatchlist = async (movie: Movie) => {
    if (user) {
      try {
        await addToWatchlist(user.uid, movie);
        setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
      } catch (error) {
        console.error('Failed to add movie to watchlist:', error);
      }
    } else {
      alert('Please login to add to watchlist');
    }
  };

  const removeMovieFromWatchlist = async (movieId: number) => {
    if (user) {
      try {
        await removeFromWatchlist(user.uid, movieId);
        setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== movieId));
      } catch (error) {
        alert('Failed to remove, please try again');
      }
    } else {
      alert('Please login to remove from watchlist');
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, loading, addMovieToWatchlist, removeMovieFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = (): WatchlistContextType => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
