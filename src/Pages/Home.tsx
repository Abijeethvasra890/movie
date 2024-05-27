import Carousel from "../Components/Carousel/Carousel"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"

const Home = () => {
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row bg-black overflow-hidden">
        <div>
          <Navbar />
        </div>
        <div className="md:ml-28">
            <Hero main="movie" search="trending" third="day"/>
            <Carousel main="movie" search="top_rated"/>
            <Carousel main ="tv" search="top_rated"/>
            <div className="mb-28"></div>
        </div>
    </div>
  )
}

export default Home