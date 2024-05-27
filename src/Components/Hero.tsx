import { useEffect, useState } from 'react';
import { fetchData } from '../utils/FetchData';

type PropsType = {
  search: string;
  main: string;
  third: string;
};

type Movie = {
  backdrop_path: string;
  title: string;
  overview: string;
};

const Hero = ({ main, search, third }: PropsType) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ mainTerm: main, searchTerm: search, thirdTerm: third });
        console.log(data.results);
        setData(data.results);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [main, search, third]);

  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/original"; 

  return (
    <div className="flex max-w-[1220px] h-[375px] m-auto p-4 bg-black  ml-3 relative">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.length > 0 && (
            <div>
              <img 
                className='md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[72%]'
                src={`${imageBaseUrl}${data[index]?.backdrop_path}`} 
                alt={data[index]?.title} 
              />
              <div className="absolute top-0 z-10 md:flex md:flex-col md:justify-center md:bottom-0 md:left-0 md:p-4 md:w-4/12 rounded-[80px] bg-black bg-opacity-80">
                <h1 className="text-2xl text-white">{data[index]?.title}</h1>
                <p className="text-white">{data[index]?.overview}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
