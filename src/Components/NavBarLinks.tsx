import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faTv, faSearch, faQuestionCircle, IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  url: string;
  name: string | null | undefined;
  photoURL?: string | null | undefined;
};

const NavBarLinks = ({ url, name, photoURL }: PropsType) => {
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
    <div>
      <div className="md:mb-10">
        <Link 
          to={url}  
          className={location.pathname === url ? 'text-red-500' : 'text-white'}
        >
          <div className="flex flex-col items-center justify-center">
            {url === '/login' && photoURL ? (
              <img
                src={photoURL}
                alt={name || 'User'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FontAwesomeIcon icon={getIcon(url)} />
            )}
            {name}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBarLinks;
