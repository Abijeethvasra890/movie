import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-stone-800 flex flex-col p-5 h-screen items-center gap-5">
        <img src="src\assets\av_logo.png" className="h-14 w-20 mb-10"/>
        <Link to="/" className={location.pathname === '/' ? 'text-yellow-500' : 'text-white'} >Home</Link>
        <Link to="/moviesplp" className={location.pathname === '/moviesplp' ? 'text-yellow-500' : 'text-white'}>Movies</Link>
        <Link to="/showsplp" className={location.pathname === '/showsplp' ? 'text-yellow-500' : 'text-white'}>Shows</Link>
        <Link to="/search" className={location.pathname === '/search' ? 'text-yellow-500' : 'text-white'}>Search</Link>
    </div>
  )
}

export default Navbar