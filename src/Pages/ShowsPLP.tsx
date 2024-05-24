import Carousel from "../Components/Carousel/Carousel"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"


const ShowsPLP = () => {
  return (
    <div className="flex  bg-black overflow-hidden">
      <div className="fixed left-0 top-0 h-full">
          <Navbar />
        </div>
        <div className="ml-28">
            <Hero />
            <Carousel main="tv" search="popular"/>
            <Carousel main="tv" search="top_rated"/>
            <Carousel main="tv" search="on_the_air"/>
            <Carousel main="tv" search="airing_today"/>
        </div>
    </div>
  )
}

export default ShowsPLP