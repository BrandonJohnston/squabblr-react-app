import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/Auth/AuthUtils';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import { SET_USERDATA, SET_ISAUTH } from '../../views/Login/UserSlice';

// Import Utility Functions
import { logoutUser } from '../../utils/Users/UsersUtils';

function HeaderUserMenu() {

	// Aliases
	const history = useHistory();
	const auth = useAuth();

	// Store state
	const dispatch = useDispatch();

	/*
	 * handleLogout
	 */
	function handleLogout() {

		// Call API utility function
		logoutUser().then(function (response) {

			if (!response.isAuthenticated) {

				// Reset user data
				const userData = {
					username: null,
					email: null,
					name: null,
					signupDate: null
				};

				// Save user data and authentication to the store
				dispatch(SET_USERDATA(userData));
				dispatch(SET_ISAUTH(false));

				auth.signout( () => {
					history.replace('/');
				});
			}

		});
	}

	return (
		<ul className={ 'user-actions-list' }>
			<li className={ 'user-action' }
				onClick={ () => handleLogout() }>
				<span>Logout</span>
			</li>
		</ul>
	);
}

export default HeaderUserMenu;
