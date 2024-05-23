import Carousel from "../Components/Carousel"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"

const Home = () => {
  return (
    <div className="flex">
        <Navbar />
        <div>
            <Hero />
            <Carousel />
        </div>
    </div>
  )
}

export default Home