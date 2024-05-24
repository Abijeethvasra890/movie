import Carousel from "../Components/Carousel/Carousel"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"

const Home = () => {
  return (
    <div className="flex bg-black overflow-hidden">
        <div className="fixed left-0 top-0 h-full">
          <Navbar />
        </div>
        <div className="ml-28">
            <Hero />
            <Carousel main="movie" search="top_rated"/>
            <Carousel main ="tv" search="top_rated"/>
        </div>
    </div>
  )
}

export default Home