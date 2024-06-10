import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faTv, faSearch, faQuestionCircle, IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  url: string;
  name: string | null | undefined;
  photoURL?: string | null | undefined;
};

const NavBarLinks = ({ url, name }: PropsType) => {
  const location = useLocation();

  const getIcon = (url: string): IconDefinition => {
    switch (url) {
      case '/':
        return faHome;
      case '/moviesplp':
        return faFilm;
      case '/showsplp':
        return faTv;
      case '/search':
        return faSearch;
      case '/login':
        return faUser;
      default:
        return faQuestionCircle;
    }
  };

  return (
    <div className="md:mb-10">
      <Link 
        to={url}  
        className={`group flex flex-col items-center justify-center ${location.pathname === url ? 'text-red-500' : 'text-white'}`}
      >
        <FontAwesomeIcon icon={getIcon(url)} className="text-2xl" /> 
        <span className="mt-1 text-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {name}
        </span>
      </Link>
    </div>
  );
};

export default NavBarLinks;
