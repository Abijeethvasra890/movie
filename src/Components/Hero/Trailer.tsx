type PropsType = {
    trailerUrl:string;
}

const Trailer = ({trailerUrl}:PropsType) => {
  return (
    <div>
        <iframe
            className="w-screen h-[40vh] md:absolute md:top-0 md:right-0 md:h-[100%] md:w-[80%] object-cover"
            src={trailerUrl}
            title="movie trailer"
        >
        </iframe>
    </div>
  )
}

export default Trailer