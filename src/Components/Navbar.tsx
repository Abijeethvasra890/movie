import Logo from "./Logo"
import NavBarLinks from "./NavBarLinks"

const Navbar = () => {
  return (
    <div className="bg-stone-800 flex flex-col p-5 h-screen items-center gap-5">
        <Logo />
        <NavBarLinks url="/" name="Home"/>
        <NavBarLinks url="/moviesplp" name="Movies"/>
        <NavBarLinks url="/showsplp" name="Shows"/>
        <NavBarLinks url="/search" name="Search"/>
    </div>
  )
}

export default Navbar