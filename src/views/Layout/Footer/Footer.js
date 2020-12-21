import React from 'react';
import { Link } from 'react-router-dom';

// Import Redux / State management
import { useSelector } from 'react-redux';
import { SELECT_ISAUTH, SELECT_LOADING } from '../../Login/UserSlice';

function SqFooter(props) {

	// Store state
	const isLoading = useSelector(SELECT_LOADING);
	const isAuth = useSelector(SELECT_ISAUTH);

	/*
	 * getUnAuthedLinks - returns footer links available when not logged in
	 */
	function getUnAuthedLinks() {
		return (
			<>
				<li>
					<Link to={ '/login' }>Login</Link>
				</li>
				<li>
					<Link to={ '/signup' }>Signup</Link>
				</li>
			</>
		);
	}

	/*
	 * getAuthedLinks - returns footer links available when logged in
	 */
	function getAuthedLinks() {
		return (
			<>
				<li>
					<Link to={ '/dashboard' }>Dashboard</Link>
				</li>
			</>
		);
	}


	if (props.isLoading) {
		return (
			<footer className={'general-module page-footer'}>
				<div className={'mod-body-wrapper'}>
					<ul className={'footer-links-list inline-list'}>
					</ul>
				</div>
			</footer>
		);
	}

	return (
		<footer className={'general-module page-footer'}>
			<div className={'mod-body-wrapper'}>
				<ul className={'footer-links-list inline-list'}>
					<li>
						<Link to={ '/' }>Home</Link>
					</li>
					<li>
						<Link to={ '/about' }>About</Link>
					</li>
					{!isLoading && !isAuth && (
						getUnAuthedLinks()
					)}
					{!isLoading && isAuth && (
						getAuthedLinks()
					)}
				</ul>
			</div>
		</footer>
	);
}

export default SqFooter;
