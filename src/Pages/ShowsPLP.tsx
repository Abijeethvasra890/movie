import Carousel from "../Components/Carousel/Carousel"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero/Hero"

import Navbar from "../Components/Navbar"


const ShowsPLP = () => {
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row bg-black overflow-hidden">
      <div>
          <Navbar />
        </div>
        <div className="md:ml-28">
            <Hero main="tv" search="trending" third="day"/>
            <Carousel main="tv" search="popular"/>
            <Carousel main="tv" search="top_rated"/>
            <Carousel main="tv" search="on_the_air"/>
            <Carousel main="tv" search="airing_today"/>
            <Footer />
            <div className="mb-20 md:mb-0"></div>
        </div>
    </div>
  )
}

export default ShowsPLP