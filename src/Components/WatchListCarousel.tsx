import CarouselCard from './CarouselCard';
import { CardContainer } from './ui/3dcard';
import { useWatchlist } from '../Context/WatchListContext';
//import { useUser } from '../Context/UserContext';
import { useAuth } from '../Context/useAuth';

const WatchListCarousel = () => {
  const { watchlist, loading  } = useWatchlist();
  //console.log(watchlist);
  //const { user } = useUser();
  const { user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-3 overflow-hidden md:w-[1150px] md:mt-10">
      {user && <p className="text-white">{user?.display_name}'s Watchlist</p>}
      {user && <div className="flex gap-4 p-3 overflow-x-scroll hide-scrollbar rounded-xl">
        {watchlist.map((movie) => (
          <CardContainer key={movie.id} className="flex flex-col">
            <CarouselCard movie={movie} isWishList={true}/>
          </CardContainer>
        ))}
      </div>}
    </div>
  );
};

export default WatchListCarousel;
