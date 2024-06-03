import { useEffect, useState } from "react";
import { fetchData } from "../../utils/FetchData";
import CarouselCard from "../CarouselCard";
import './Carousel.css';
import { Link } from "react-router-dom";
import { CardContainer } from "../ui/3dcard";
import { useWatchlist } from "../../Context/WatchListContext";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type PropsType = {
  search: string;
  main: string;
  third?: string;
  pdppage?: boolean;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name: string;
};

const Carousel = ({ main, search, third, pdppage }: PropsType) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addMovieToWatchlist } = useWatchlist();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ mainTerm: main, searchTerm: search, thirdTerm: third });
        if (data.cast) {
          setData(data.cast.slice(1, 10));
        } else {
          setData(data.results);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [search, main, third]);

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const movieCheck = main === "movie";

  const handleAddWatchList = (movie: Movie) => {
    addMovieToWatchlist(movie);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <div className="flex flex-col h-96 justify-between" key={index}>
        <CardContainer>
          <Skeleton height={300} width={144} baseColor="#1f2937" highlightColor="#374151"/>
        </CardContainer>
        <Skeleton width={144} height={36} className="mt-5"  baseColor="#1f2937" highlightColor="#374151"/>
      </div>
    ));
  };

  return (
    <div className="m-3 overflow-hidden md:w-[1150px]">
      <p className="text-white">
        {pdppage ? "Cast" : `${capitalizeFirstLetter(main)} ${search}`}
      </p>
      <div className="flex gap-4 p-3 overflow-x-scroll hide-scrollbar rounded-xl">
        {loading ? (
          renderSkeletons()
        ) : (
          data.length > 1 && movieCheck ? (
            data.map((movie) => (
              pdppage ? (
                <CardContainer key={movie.id}>
                  <CarouselCard movie={movie} />
                </CardContainer>
              ) : (
                <div className="flex flex-col h-96 justify-between" key={movie.id}>
                  <Link to={`movie/pdp/${movie.id}`}>
                    <CardContainer>
                      <CarouselCard movie={movie} />
                    </CardContainer>
                  </Link>
                  <button
                    className="bg-neutral-800 opacity-70 rounded-sm text-white w-36 p-2"
                    onClick={() => handleAddWatchList(movie)}
                  >
                    Add to WatchList
                  </button>
                </div>
              )
            ))
          ) : (
            data.map((movie) => (
              pdppage ? (
                <CardContainer key={movie.id}>
                  <CarouselCard movie={movie} />
                </CardContainer>
              ) : (
                <div className="flex flex-col h-96 justify-between" key={movie.id}>
                  <Link to={`show/pdp/${movie.id}`}>
                    <CardContainer>
                      <CarouselCard movie={movie} />
                    </CardContainer>
                  </Link>
                  <button
                    className="bg-neutral-800 opacity-70 rounded-sm text-white mt-5 w-36 p-2"
                    onClick={() => handleAddWatchList(movie)}
                  >
                    Add to WatchList
                  </button>
                </div>
              )
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
