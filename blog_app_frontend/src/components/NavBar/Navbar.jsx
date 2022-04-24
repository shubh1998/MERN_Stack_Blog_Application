import { Link } from 'react-router-dom';
const Navbar = () => {
  const user = null

  const Links = user ? (
		<div className='navbar__right'>
			<li>
				<Link to='/create'>Create Post</Link>
			</li>
			<li>
				<Link to='/dashboard/1'>{user.name}</Link>
			</li>
			<li>
				<span>Logout</span>
			</li>
		</div>
	) : (
		<div className='navbar__right'>
      <li>
				<Link to='/'>Home</Link>
      </li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
		</div>
	);
	return (
		<nav className='navbar'>
			<div className='container'>
				<div className='navbar__row'>
					<div className='navbar__left'>
						<Link to='/'>
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
