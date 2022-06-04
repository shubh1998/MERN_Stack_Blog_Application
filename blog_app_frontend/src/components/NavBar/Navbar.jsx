import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'utils/constants/index';
import { getAuthToken, signOut } from 'utils/services/cookie.services';
import { openSuccessToaster } from 'utils/services/toaster.services'

const Navbar = () => {
  const isAuthenticated = getAuthToken()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate('/')
    openSuccessToaster('Logout Successfully !')
  }

  const Links = isAuthenticated ? (
    <div className='navbar__right'>
      <li>
        <Link to={ROUTE_PATHS.dashboard}>Dashboard</Link>
      </li>
      <li>
        <Link to={ROUTE_PATHS.createPost}>Create Post</Link>
      </li>
      <li>
        <span onClick={handleLogout}>Logout</span>
      </li>
    </div>
  ) : (
    <div className='navbar__right'>
      <li>
        <Link to={ROUTE_PATHS.home}>Home</Link>
      </li>
      <li>
        <Link to={ROUTE_PATHS.login}>Login</Link>
      </li>
      <li>
        <Link to={ROUTE_PATHS.register}>Register</Link>
      </li>
    </div>
  );
  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar__row'>
          <div className='navbar__left'>
            <Link to={ROUTE_PATHS.home}>
              <img src='/images/logo.png' alt='' />
            </Link>
          </div>
          {Links}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
