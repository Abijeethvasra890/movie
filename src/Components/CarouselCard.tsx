import { CardBody, CardItem } from "./ui/3dcard";

type Movie = {
  id: number;
  title?: string;
  poster_path?: string;
  name?: string;
  cast_id?: number;
  profile_path?: string;
  character?: string;
  known_for_department?:string;
};

type PropsType = {
  movie: Movie;

};

const CarouselCard = ({ movie }: PropsType) => {
  if (!movie) {
    return null; 
  }
  //console.log(movie.profile_path);

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="flex flex-col">
      <CardBody>
        <CardItem>
        <img
        className="rounded-md shadow-inner shadow-slate-300"
        src={`${imageBaseUrl}${movie.known_for_department ? movie.profile_path : movie.poster_path}`}
        alt={movie.title || movie.name || "Movie Poster"}
      />
      <div className="text-white">
        {movie.title || movie.name}
      </div>
      {movie.character && (
        <div className="text-white">
          {movie.character}
        </div>
      )}
        </CardItem>
      </CardBody>
      
    </div>
  );
};

export default CarouselCard;
