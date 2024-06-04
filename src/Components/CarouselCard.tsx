import { Link } from "react-router-dom";
import { useWatchlist } from "../Context/WatchListContext";
import { CardBody, CardItem } from "./ui/3dcard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  cast_id?: number;
  profile_path?: string;
  character?: string;
  known_for_department?: string;
  backdrop_path: string;
  overview: string;
};

type PropsType = {
  movie: Movie;
  isWishList?: boolean;
  ispdp?: boolean;
};

const CarouselCard = ({ movie, isWishList, ispdp }: PropsType) => {
  const { addMovieToWatchlist, removeMovieFromWatchlist } = useWatchlist();

  if (!movie) {
    return null;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  const handleAddWatchList = (movie: Movie) => {
    addMovieToWatchlist(movie);
  };

  const handleRemoveWatchList = (movieId: number) => {
    removeMovieFromWatchlist(movieId);
  };

  return (
    <div className="flex flex-col max-h-80 relative">
      <CardBody>
        <CardItem>
          <Link to={movie.title ? `movie/pdp/${movie.id}` : `show/pdp/${movie.id}`}>
            <img
              className="rounded-md"
              src={`${imageBaseUrl}${movie.known_for_department ? movie.profile_path : movie.poster_path}`}
              alt={movie.title || movie.name || "Movie Poster"}
            />
          </Link>
        </CardItem>
      </CardBody>
      <div className="flex justify-between items-center z-10">
        <div className="text-white">
          {movie.title || movie.name}
        </div>
        {!ispdp ? (
          isWishList ? (
            <button
              className="bg-neutral-800 text-white p-2 w-8 h-10 mt-2"
              onClick={() => handleRemoveWatchList(movie.id)}
            >
              -
            </button>
          ) : (
            <button
              className="bg-neutral-500 opacity-70 rounded-sm text-white p-2 w-8 h-10 mt-2"
              onClick={() => handleAddWatchList(movie)}
            >
              +
            </button>
          )
        ) : null}
      </div>
      {movie.character && (
        <div className="text-white">
          {movie.character}
        </div>
      )}
    </div>
  );
};

export default CarouselCard;
