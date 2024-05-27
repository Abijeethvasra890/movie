import React from 'react';

type Movie = {
  id: number;
  title?: string;
  poster_path?: string;
  name?: string;
  cast_id?: number;
  profile_path?: string;
  character?: string;
};

type PropsType = {
  movie: Movie;
};

const CarouselCard = ({ movie }: PropsType) => {
  if (!movie) {
    return null; 
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="flex flex-col">
      <img
        className="min-w-44"
        src={`${imageBaseUrl}${movie.cast_id ? movie.profile_path : movie.poster_path}`}
        alt={movie.title || movie.name || "Movie Poster"}
      />
      <div className="text-white">
        {movie.title || movie.name}
      </div>
      {movie.character && (
        <div className="text-white">
          {movie.character}
        </div>
      )}
    </div>
  );
};

export default CarouselCard;
