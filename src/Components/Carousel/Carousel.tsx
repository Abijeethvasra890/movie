import { useEffect, useState } from "react";
import { fetchData } from "../../utils/FetchData"
import CarouselCard from "../CarouselCard";
import './Carousel.css';
import { Link } from "react-router-dom";
import { CardContainer } from "../ui/3dcard";
import { addToWatchlist } from "../../utils/WatchList";
import { auth } from "../../firebaseConfig";

type PropsType = {
  search: string;
  main:string;
  third?:string;
  pdppage?:boolean;
}

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name:string
};

const Carousel = ({main, search, third, pdppage}:PropsType) => {
  const [data, setData] = useState<Movie[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ mainTerm: main, searchTerm: search, thirdTerm: third });
        //console.log(data.cast);
        if(data.cast){
          setData(data.cast.slice(1,10));
         // console.log("set data.cast");
          
        }
        else setData(data.results);
       
        //console.log(data.cast.slice(1,10));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    getData();
  }, [search]);

  const capitalizeFirstLetter = (text:string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  let movieCheck = false;
  if(main == "movie") movieCheck = true;

  const handleAddWatchList = (movie: Movie) => {
    let user = auth?.currentUser;
    if (user) {
      addToWatchlist(user.uid, movie);
    } else {
      alert('Please login to add to watchlist');
    }
  };
 // console.log(data);
  return (
    <div className="m-3 overflow-hidden md:w-[1150px]">
      <p className="text-white">
        {pdppage ? "Cast" : `${capitalizeFirstLetter(main)} ${search}`}
      </p>
      <div className="flex gap-4 p-3 overflow-x-scroll hide-scrollbar rounded-xl" >
        {data.length > 1 && movieCheck ? (
         data.map((movie) => (
          pdppage ? (
            <CardContainer key={movie.id}>
              <CarouselCard movie={movie} />
            </CardContainer>
          ) : (
            <div className="flex flex-col h-96">
              <Link key={movie.id} to={`movie/pdp/${movie.id}`}>
                <CardContainer>
                  <CarouselCard movie={movie} />
                </CardContainer>
              </Link>
              <button className='bg-neutral-800 text-white mt-5 w-36 p-2' onClick={() => handleAddWatchList(movie)}>Add to WatchList</button>
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
              <Link key={movie.id} to={`show/pdp/${movie.id}`}>
                <CardContainer>
                  <CarouselCard movie={movie} />
                </CardContainer>
              </Link>
            )
          ))
        )}
        
      </div>
    </div>
  )
}

export default Carousel