import Logo from "./Logo";
import NavBarLinks from "./NavBarLinks";

const Navbar = () => {
  return (
    <div className="z-30 bg-stone-800 flex justify-around items-center fixed left-0 bottom-0 w-full md:w-auto md:fixed md:left-0 md:top-0 md:flex-col md:p-5 md:h-screen gap-5">
      <Logo />
      <NavBarLinks url="/" name="Home" />
      <NavBarLinks url="/moviesplp" name="Movies" />
      <NavBarLinks url="/showsplp" name="Shows" />
      <NavBarLinks url="/search" name="Search" />
    </div>
  );
};

export default Navbar;
