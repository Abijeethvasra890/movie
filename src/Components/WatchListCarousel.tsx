import CarouselCard from './CarouselCard';
import { CardContainer } from './ui/3dcard';
import { useWatchlist } from '../Context/WatchListContext';
import { useUser } from '../Context/UserContext';

const WatchListCarousel = () => {
  const { watchlist, loading, removeMovieFromWatchlist } = useWatchlist();
  const { user } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your watchlist.</div>;
  }

  return (
    <div className="m-3 overflow-hidden md:w-[1150px] md:mt-10">
      <p className="text-white">{user.displayName}'s Watchlist</p>
      <div className="flex gap-4 p-3 overflow-x-scroll hide-scrollbar rounded-xl">
        {watchlist.map((movie) => (
          <CardContainer key={movie.id} className="flex flex-col">
            <CarouselCard movie={movie} />
            <button
              className="bg-neutral-800 text-white mt-5 w-36 p-2"
              onClick={() => removeMovieFromWatchlist(movie.id)}
            >
              Remove from WatchList
            </button>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default WatchListCarousel;
