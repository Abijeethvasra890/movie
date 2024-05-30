
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Search from '../Components/Search'

const SearchPage = () => {
  return (
    <div className='md:flex md:flex-row h-screen bg-black overflow-hidden'>
        <Navbar />
        <div className='md:ml-28'>
            <Search />
            <Footer />
            <div className="mb-20 md:mb-0"></div>
        </div>
       
    </div>
  )
}

export default SearchPage