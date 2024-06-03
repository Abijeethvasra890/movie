
import Navbar from "../Components/Navbar"
import Carousel from "../Components/Carousel/Carousel"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero/Hero"


const MoviesPLP = () => {
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row bg-black overflow-hidden">
      <div>
          <Navbar />
        </div>
        <div className="md:ml-28">
            <Hero main="movie" search="trending" third="day" />
            <Carousel main="movie" search="popular"/>
            <Carousel main="movie" search="top_rated"/>
            <Carousel main="movie" search="now_playing"/>
            <Footer />
            <div className="mb-20 md:mb-0"></div>
        </div>
    </div>
  )
}

export default MoviesPLP