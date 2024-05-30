// src/components/Watchlist.tsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CarouselCard from './CarouselCard';
import { CardContainer } from './ui/3dcard';
import { useUser } from '../Context/UserContext';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name: string;
};

const Watchlist: React.FC = () => {
  const { user } = useUser();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;

      try {
        const userWatchlistRef = collection(db, `users/${user.uid}/watchlist`);
        const watchlistSnapshot = await getDocs(userWatchlistRef);
        const watchlistData = watchlistSnapshot.docs.map((doc) => doc.data() as Movie);
        setWatchlist(watchlistData);
      } catch (error) {
        console.error('Failed to fetch watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your watchlist.</div>;
  }

  return (
    <div className="m-3 overflow-hidden md:w-[1150px]">
      <p className="text-white">{user.displayName}'s Watchlist</p>
      <div className="flex gap-4 p-3 overflow-x-scroll hide-scrollbar rounded-xl">
        {watchlist.map((movie) => (
          <CardContainer key={movie.id}>
            <CarouselCard movie={movie} />
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
