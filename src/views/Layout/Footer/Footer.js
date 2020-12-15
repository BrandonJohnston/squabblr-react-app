import React from 'react';
import { Link } from 'react-router-dom';

function SqFooter() {

	return (
		<footer className={'general-module page-footer'}>
			<div className={'mod-body-wrapper'}>
				<ul className={'footer-links-list inline-list'}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default SqFooter;
