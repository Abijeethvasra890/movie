import { useEffect, useState } from 'react';
import { fetchData } from '../utils/FetchData';
import { fetchMovieTrailer } from '../utils/FetchData'; // Assume you have this utility to fetch movie trailer
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';
import './Hero.css'

type PropsType = {
  search: string;
  main: string;
  third?: string;
  pdp?: boolean;
};

type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  original_name?: string;
  name?: string;
  vote_average: number;
  vote_count: number;
};

const Hero = ({ main, search, third, pdp }: PropsType) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ mainTerm: main, searchTerm: search, thirdTerm: third });
        console.log(data);
        if (pdp) setData([data]);
        else setData(data.results);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [main, search, third]);

  useEffect(() => {
    if (data?.length > 0 && !pdp && !paused) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data, pdp, paused]);

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    setPaused(true);
    const timer = setTimeout(async () => {
      try { 
        const trailer = await fetchMovieTrailer(data[index].id);
        const key = trailer?.results.find((result: { name: string | string[]; }) => 
            result.name.includes("Official Trailer"))?.key;
        //console.log(key);
        if (key) {
          const url = `https://www.youtube.com/embed/${key}?autoplay=1&controls=0&showinfo=0`;
          setShowTrailer(true);
          setTrailerUrl(url);
        } else {
          console.error('Trailer key not found in response:', trailer);
        }
      } catch (error) {
        console.error('Error fetching movie trailer:', error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    setPaused(false);
    setShowTrailer(false);
    setTrailerUrl(null);
  };

  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <div
      className="flex max-w-screen rounded-xl md:h-[375px] m-auto p-4 ml-3 relative shadow-red-800 shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.length > 1 && (
            <div>
              {showTrailer && trailerUrl ? (
                <>
                <p>I am in iframe</p>
                <iframe
                  className="md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[80%] object-cover"
                  src={trailerUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="movie trailer"
                >
                </iframe>
                </>
              ) : (
                <img
                  className="md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[80%] object-cover "
                  src={`${imageBaseUrl}${data[index]?.backdrop_path}`}
                  alt={data[index]?.title || data[index]?.name}
                />
              )}
              <div className="md:absolute md:top-0 md:z-10 md:flex md:flex-col md:justify-center md:bottom-0 md:left-10 md:p-4 md:w-4/12 hero-image">
                <h1 className="text-2xl text-white">{data[index]?.title || data[index]?.name}</h1>
                <div className="flex items-center gap-2">
                  <StarRating rating={data[index].vote_average} />
                  <p className="text-white text-sm">( {data[index].vote_count} )</p>
                </div>
                <p className="text-white">
                  {isExpanded ? data[index]?.overview : truncateText(data[index]?.overview || '', 50)}
                  {data[index]?.overview.split(' ').length > 50 && (
                    <span className="text-red-500 cursor-pointer" onClick={toggleExpand}>
                      {isExpanded ? ' Show Less' : ' Read More'}
                    </span>
                  )}
                </p>
              </div>
              {!pdp && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                  <FontAwesomeIcon icon={faArrowCircleLeft} onClick={handlePrevious} className="text-white text-2xl cursor-pointer" />
                </div>
              )}
              {!pdp && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-20">
                  <FontAwesomeIcon icon={faArrowCircleRight} onClick={handleNext} className="text-white text-2xl cursor-pointer" />
                </div>
              )}
            </div>
          )}
          {pdp && (
            <div>
              <img
                className="md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[72%]"
                src={`${imageBaseUrl}${data[0]?.backdrop_path}`}
                alt={data[0]?.title || data[0]?.original_name}
              />
              <div className="md:absolute md:top-0 md:z-10 md:flex md:flex-col md:justify-center md:bottom-0 md:left-10 md:p-4 md:w-4/12 rounded-[80px] bg-black bg-opacity-80">
                <h1 className="text-2xl text-white">{data[0]?.title || data[0]?.original_name}</h1>
                <StarRating rating={data[0].vote_average} />
                <p className="text-white">
                  {isExpanded ? data[0]?.overview : truncateText(data[0]?.overview || '', 50)}
                  {data[0]?.overview.split(' ').length > 50 && (
                    <span className="text-red-500 cursor-pointer" onClick={toggleExpand}>
                      {isExpanded ? ' Show Less' : ' Read More'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
