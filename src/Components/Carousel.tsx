import { useEffect, useState } from "react";
import { fetchData } from "../utils/FetchData"
import CarouselCard from "./CarouselCard";

type PropsType = {
  search: string;
  main:string;
}

const Carousel = ({main, search}:PropsType) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ mainTerm: main, searchTerm: search });
        console.log(data.results);
        setData(data.results);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    getData();
  }, [search]);


  return (
    <div className="m-3">
      <p className="text-white">{`${main} ${search}`}</p>
      <div className="flex gap-2 bg-stone-800 p-3" >
        {data.length > 0 ? (
          data.map((movie) => (
            <CarouselCard  movie={movie} /> 
          ))
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

export default Carousel