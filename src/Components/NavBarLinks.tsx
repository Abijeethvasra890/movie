import { Link } from "react-router-dom"

type PropsType = {
    url: string;
    name: string;
}

const NavBarLinks = ({url,name}:PropsType) => {
  return (
    <div>
        <Link 
            to={url}  
            className={location.pathname === `${url}` ? 'text-yellow-500' : 'text-white'}
            >
                {name}
        </Link>
    </div>
  )
}

export default NavBarLinks