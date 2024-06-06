import { FormEvent, useEffect, useState } from 'react';
import { searchMovies } from '../utils/FetchData';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/useAuth';
//import { logSearch } from '../utils/api';
//import { useUser } from '../Context/UserContext';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

type Genre = {
  genre_id: number;
  genre_name: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  //const { user } = useUser();
  const [genres, setGenres] = useState<Genre[]>([]);
  const { user } = useAuth();
  console.log(user?.id);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/log/user-genres`, {
          params: { user_id: user?.id },
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        setGenres(response.data);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    if (user) {
      fetchGenres();
    }
  }, [user]);


  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await searchMovies(query);
      //console.log(data);
      setResults(data.results);
      //logSearch(user.uid, "search","Thriller");
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  return (
    <div className="mt-8 ml-5 flex flex-col">
      <p className="text-white text-2xl">Search</p>
      <form onSubmit={handleSearch} className="flex w-full justify-center mt-5">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="bg-neutral-800 text-white p-3 border-gray-100 w-96 h-10 border-solid"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="text-white ml-5 p-2 bg-neutral-500 rounded-xl" type="submit">
          Search
        </button>
      </form>
      <div className="mt-10 mb-20 w-screen md:w-screen search-results flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {results.length > 0 ?results.map((movie) => (
          <div key={movie.id} className="movie w-60 md:w-48 bg-neutral-800 rounded-md p-2">
            <Link to={`movie/pdp/${movie.id}`}>
              <img
                className="w-60 md:w-48 rounded-md"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info ">
                <h3 className="text-white ">{movie.title}</h3>
              </div>
            </Link>
          </div>
        )): <div className='text-white'>
             <ul>
              {genres.map((genre, index) => (
                <li key={index}>{genre.genre_name}</li>
              ))}
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default Search;
