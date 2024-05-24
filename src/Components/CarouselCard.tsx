type Movie = {
    id: number;
    title: string;
    poster_path:string;
    name:string
    // Add other properties as needed
  };

type PropsType = {
    movie: Movie;
}


const CarouselCard = ({ movie }: PropsType) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/original"; 
    return (
      <div className="flex flex-col">
        <img className="min-w-44 " src={`${imageBaseUrl}${movie.poster_path}`} alt={`${movie.title} poster`} />
        <div className="text-white">{movie.title ? movie.title : movie.name}</div>
      </div>
    );
  };

export default CarouselCard