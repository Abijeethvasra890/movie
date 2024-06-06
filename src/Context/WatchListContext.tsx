
import React, { createContext, useContext, useEffect, useState } from 'react';
// import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from '../utils/WatchList';
// import { useUser } from './UserContext';
import axios from 'axios';
import { useAuth } from './useAuth';

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
  //const { user } = useUser();
  const { user } = useAuth();

  // useEffect(() => {
  //   const handleFetchWatchlist = async () => {
  //     if (!user) return;
  //     try {
  //       const watchlistData = await fetchWatchlist(user.id);
  //       setWatchlist(watchlistData || []);
  //     } catch (error) {
  //       console.error('Failed to fetch watchlist:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   handleFetchWatchlist();
  // }, [user, watchlist]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`http://localhost:3001/wishlist/${user.id}`);
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist', error);
      }finally{
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  // const addMovieToWatchlist = async (movie: Movie) => {
  //   if (user) {
  //     try {
  //       await addToWatchlist(user.uid, movie);
  //       setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  //     } catch (error) {
  //       console.error('Failed to add movie to watchlist:', error);
  //     }
  //   } else {
  //     alert('Please login to add to watchlist');
  //   }
  // };

  const addMovieToWatchlist = async (movie: Movie) => {
    try {
      await axios.post('http://localhost:3001/wishlist/add', {
        user_id: user?.id,
        movie_id: movie.id,
        movie_title: movie.title,
        movie_poster: movie.poster_path,
      });
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    } catch (error) {
      console.error('Error adding to wishlist', error);
    }
  };

  // const removeMovieFromWatchlist = async (movieId: number) => {
  //   console.log(movieId);
  //   // if (user) {
  //   //   try {
  //   //     await removeFromWatchlist(user.uid, movieId);
  //   //     setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== movieId));
  //   //   } catch (error) {
  //   //     alert('Failed to remove, please try again');
  //   //   }
  //   // } else {
  //   //   alert('Please login to remove from watchlist');
  //   // }
  // };

  const removeMovieFromWatchlist = async (movie_id: number) => {
    try {
      await axios.post(`http://localhost:3001/wishlist/remove`, { user_id: user?.id, movie_id });
      setWatchlist(watchlist.filter((movie) => movie.id !== movie_id));
      console.log("removed from watchlist");
    } catch (error) {
      console.error('Error removing movie from wishlist', error);
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
