import { useEffect, useState } from 'react';
import { fetchData } from '../utils/FetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  search: string;
  main: string;
  third?: string;
  pdp?: boolean;
};

type Movie = {
  backdrop_path: string;
  title: string;
  overview: string;
  original_name?:string;
  name?:string;
};


const Hero = ({ main, search, third, pdp }: PropsType) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ mainTerm: main, searchTerm: search, thirdTerm: third });
        //console.log(data);
        if (pdp) setData([data]); // Ensure data is an array
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
    if (data?.length > 0 && !pdp) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data?.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data, pdp]);

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/original"; 

  return (
    <div className="flex max-w-[1150px] md:h-[375px] m-auto p-4 bg-black ml-3 relative">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.length > 1 && (
            <div>
              <img 
                className='md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[72%]'
                src={`${imageBaseUrl}${data[index]?.backdrop_path}`} 
                alt={data[index]?.title || data[index]?.name} 
              />
              <div className="md:absolute md:top-0 md:z-10 md:flex md:flex-col md:justify-center md:bottom-0 md:left-10 md:p-4 md:w-4/12 rounded-[80px] bg-black bg-opacity-80">
                <h1 className="text-2xl text-white">{data[index]?.title || data[index]?.name}</h1>
                <p className="text-white">{data[index]?.overview}</p>
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
                className='md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[72%]'
                src={`${imageBaseUrl}${data[0]?.backdrop_path}`} 
                alt={data[0]?.title || data[0]?.original_name} 
              />
              <div className="absolute top-0 z-10 md:flex md:flex-col md:justify-center md:bottom-0 md:left-0 md:p-4 md:w-4/12 rounded-[80px] bg-black bg-opacity-80">
                <h1 className="text-2xl text-white">{data[0]?.title || data[0]?.original_name}</h1>
                <p className="text-white">{data[0]?.overview}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
