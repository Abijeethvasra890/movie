import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faTv, faSearch, faQuestionCircle, IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  url: string;
  name: string | null | undefined;
  photoURL?: string | null | undefined;
};

const NavBarLinks = ({ url, name, photoURL  }: PropsType) => {
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
        {url === '/login' && photoURL ? (
          <>
            <img
              src={photoURL}
              alt={name || 'User'}
              className="w-8 h-8 rounded-full"
            />
          </>
        ) : (
          <FontAwesomeIcon icon={getIcon(url)} className="text-2xl" />
        )}
        <span className="hidden group-hover:block mt-1 text-sm">{name}</span>
      </Link>
    </div>
  );
};

export default NavBarLinks;
