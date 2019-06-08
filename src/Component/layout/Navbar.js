import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</div>
	);
};

Navbar.defaultProps = {
	title : 'Github Finder',
	icon  : 'fab fa-github'
};

export default Navbar;
