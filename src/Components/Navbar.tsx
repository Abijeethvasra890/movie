import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Logo from "./Logo";
import NavBarLinks from "./NavBarLinks";
import { useUser } from "../Context/UserContext";

const Navbar = () => {
  const { user } = useUser();
  
  console.log(user);
  const handleLogout = async() => {
    try {
        await signOut(auth);
        alert("Logged Out");
      } catch (err) {
        alert(err);
      }
}

  return (
    <div className="z-50 bg-stone-800 bg-opacity-50 flex justify-around items-center fixed left-0 bottom-0 w-full md:w-auto md:fixed md:left-0 md:top-0 md:flex-col md:p-2 md:h-screen gap-2">
      <Logo />
      <NavBarLinks url="/" name="Home" />
      <NavBarLinks url="/moviesplp" name="Movies" />
      <NavBarLinks url="/showsplp" name="Shows" />
      <NavBarLinks url="/search" name="Search" />
      <NavBarLinks url="/login" name={user ? user.displayName : "Sign In" }/>
      {user!=null && (
       <div>
            <button className="text-white" onClick={handleLogout}> Logout</button>
        </div>
    )}
    </div>
  );
};

export default Navbar;
