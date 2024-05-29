
import Navbar from '../Components/Navbar'
import Search from '../Components/Search'

const SearchPage = () => {
  return (
    <div className='flex flex-col-reverse md:flex md:flex-row h-screen bg-black overflow-hidden'>
        <Navbar />
        <div className='flex items-center md:ml-28 bg-black'>
            <Search />
        </div>
        
    </div>
  )
}

export default SearchPage