import hero from '../assets/hero.jpg';

const Hero = () => {
  return (
    <div className="max-w-[1400px] h-[300px] w-[1200px] m-auto p-4 bg-neutral-800 ml-3 relative">
    <div
      style={{ backgroundImage: `url(${hero})` }}
      className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
        <p className='flex justify-center text-white h-[200px] items-center'>Hero Carousel</p>
    </div>
  </div>
  )
}

export default Hero