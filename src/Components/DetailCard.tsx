import { useEffect, useState } from 'react';
import { fetchData } from '../utils/FetchData';
import axios from 'axios';
import { useAuth } from '../Context/useAuth';

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
  languages: [];
  tagline: string;
  popularity: number;
};

const DetailCard = ({ mainTerm, searchTerm, id }: PropsType) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const {user} = useAuth();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchData({ mainTerm, searchTerm: id });
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    getMovie();
  }, [id, mainTerm, searchTerm]);

  console.log(movie?.genres);
  useEffect(() => {
    const logVisit = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = 'https://movie-backend-1nau.onrender.com';
        await axios.post(
          `${API_BASE_URL}/log/log-visit`,
          { genre: movie?.genres , user_id: user?.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error('Failed to log visit:', err);
      }
    };

    if(movie?.genres) logVisit();
  }, [movie]);

  if (!movie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-5 items-center md:flex-row md:max-w-[calc(100%-200px)]">
      {mainTerm == "movie" ? (
        <>
          <img 
            className="w-56 md:w-60 h-80 m-3 rounded-md"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
            alt={movie.title} 
          />
          <div className='text-white m-3 p-2 md:w-[calc(100%-100px)] bg-neutral-800 rounded-xl h-80 flex flex-col justify-center'>
            <div className='p-2'>
              <h1 className="text-2xl mb-4">Story Line</h1>
              <p className="mb-4">{movie.overview}</p>
            </div>
            <div className='flex flex-col md:flex-row m-3 p-5 md:gap-20'>
              <div className='flex flex-col'>
                <p>Released: {movie.release_date}</p>
                <p>Status: {movie.status}</p>
                <p>Revenue: ${movie.revenue.toLocaleString()}</p>
              </div>
              <div className='flex flex-col'>
                <p>Runtime: {movie.runtime} minutes</p>
                <p>
                  Genre: {movie.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < movie.genres.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p>
                  Language: {movie.spoken_languages.map((language, index) => (
                    <span key={index}>
                      {language.english_name}
                      {index < movie.spoken_languages.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </>
      ):(
        <>
           <img 
            className="w-60 m-3 rounded-md"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
            alt={movie.title} 
          />
           <div className='text-white m-3 md:w-[890px] bg-neutral-800 rounded-xl h-76 flex flex-col justify-center'>
            <div className='p-2'>
              <h1 className="text-2xl mb-4">Story Line</h1>
              <p className="mb-4">{movie.overview}</p>
            </div>
            <div className='flex flex-col md:flex-row m-3 p-5 md:gap-20'>
              <div className='flex flex-col'>
                <p>Status: {movie.status}</p>
                <p>Tagline: {movie.tagline}</p>
                <p>Popularity: {movie.popularity}</p>
              </div>
              <div className='flex flex-col'>
                <p>
                  Genre: {movie.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < movie.genres.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p>
                  Language: {movie.languages.map((language, index) => (
                    <span key={index}>
                      {language}
                      {index < movie.spoken_languages.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailCard;
