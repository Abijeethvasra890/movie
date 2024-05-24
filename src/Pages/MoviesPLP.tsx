
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Carousel from "../Components/Carousel"


const MoviesPLP = () => {
  return (
    <div className="flex bg-black">
      <div className="fixed left-0 top-0 h-full">
          <Navbar />
        </div>
        <div className="ml-28">
            <Hero />
            <Carousel main="movie" search="popular"/>
            <Carousel main="movie" search="top_rated"/>
            <Carousel main="movie" search="now_playing"/>
        </div>
    </div>
  )
}

export default MoviesPLP