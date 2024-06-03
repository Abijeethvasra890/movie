import Carousel from "../Components/Carousel/Carousel"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero/Hero"
import Navbar from "../Components/Navbar"
import WatchListCarousel from "../Components/WatchListCarousel"

const Home = () => {
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row bg-black overflow-hidden">
        <div>
          <Navbar />
        </div>
        <div className="md:ml-28">
            <Hero main="movie" search="trending" third="day"/>
            <WatchListCarousel />
            <Carousel main="movie" search="top_rated"/>
            <Carousel main ="tv" search="top_rated"/>
            <Footer />
            <div className="mb-20 md:mb-0"></div>
        </div>
    </div>
  )
}

export default Home