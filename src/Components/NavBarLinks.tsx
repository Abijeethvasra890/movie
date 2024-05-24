import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faTv, faSearch } from '@fortawesome/free-solid-svg-icons';


type PropsType = {
    url: string;
    name: string;
}

const NavBarLinks = ({url,name}:PropsType) => {
    const getIcon = (url) => {
        switch (url) {
          case '/':
            return faHome;
          case '/moviesplp':
            return faFilm;
          case '/showsplp':
            return faTv;
          case '/search':
            return faSearch;
          default:
            return null;
        }
      };
  return (
    <div>
        <div className="mb-10">
            <Link 
                to={url}  
                className={location.pathname === url ? 'text-red-500' : 'text-white'}
            >
                <div className="flex flex-col items-center justify-center"> 
                    {getIcon(url) && <FontAwesomeIcon icon={getIcon(url)} className="mr-2" />}
                    {name}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default NavBarLinks