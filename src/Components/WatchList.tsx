// src/components/Watchlist.tsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CarouselCard from './CarouselCard';
import { CardContainer } from './ui/3dcard';
import { useUser } from '../Context/UserContext';
import { removeFromWatchlist } from '../utils/WatchList';

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

  const handleRemoveWatchList = (id:number) => {
    let user = auth?.currentUser;
    if (user) {
      removeFromWatchlist(user.uid, id);
    } else {
      alert('Failed to remove please try agains');
    }
  }

  return (
    <div className="m-3 overflow-hidden md:w-[1150px]">
      <p className="text-white">{user.displayName}'s Watchlist</p>
      <div className="flex gap-4 p-3 overflow-x-scroll hide-scrollbar rounded-xl">
        {watchlist.map((movie) => (
          <CardContainer key={movie.id} className='flex flex-col'>
            <CarouselCard movie={movie} />
            <button className='bg-neutral-800 text-white mt-5 w-36 p-2' onClick={() => handleRemoveWatchList(movie.id)}>Remove from WatchList</button>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
