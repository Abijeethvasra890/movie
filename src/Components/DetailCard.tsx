import  { useEffect, useState } from 'react';
import { fetchData } from '../utils/FetchData';

type PropsType = {
  mainTerm: string;
  searchTerm: string;
  id: string;
};

type Movie = {
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  status: string;
  revenue: number;
  runtime: number;
  genres: { id: number; name: string }[];
  spoken_languages: { english_name: string }[];
};

const DetailCard = ({ mainTerm, searchTerm, id }: PropsType) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchData({ mainTerm, searchTerm: id });
       // console.log(data);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    getMovie();
  }, [id, mainTerm, searchTerm]);

  if (!movie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex">
      <img 
        className="w-60 m-3 rounded-md"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
        alt={movie.title} 
      />
      <div className='text-white m-3 w-[890px] bg-neutral-800 rounded-xl h-76 flex flex-col justify-center'>
        <div className='p-2'>
          <h1 className="text-2xl mb-4">Story Line</h1>
          <p className="mb-4">{movie.overview}</p>
        </div>
        <div className='flex m-3 p-5 gap-20'>
          <div className='flex flex-col'>
            <p>Released: {movie.release_date}</p>
            <p>Status: {movie.status}</p>
            <p>Revenue: ${movie.revenue.toLocaleString()}</p>
          </div>
          <div className='flex flex-col'>
            <p>Runtime: {movie.runtime} minutes</p>
            <p>Genre: {movie.genres.map((genre, index) => (
              <span key={genre.id}>
                {genre.name}
                {index < movie?.genres.length - 1 ? ', ' : ''}
              </span>
            ))}</p>
           <p>Language: {movie?.spoken_languages.map((language, index) => (
            <span key={index}>
                {language.english_name}
                {index < movie.spoken_languages.length - 1 ? ', ' : ''}
            </span>
            ))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
