type PropsType = {
    trailerUrl:string;
}

const Trailer = ({trailerUrl}:PropsType) => {
  return (
    <div>
        <iframe
            className="md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[80%] object-cover"
            src={trailerUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="movie trailer"
        >
        </iframe>
    </div>
  )
}

export default Trailer