import React, { useEffect } from 'react';
import { useLocation, useHistory, Switch, Route } from 'react-router-dom';
import { PrivateRoute, useAuth } from "./utils/Auth/AuthUtils";

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import {
	SELECT_LOADING, SELECT_ISAUTH,
	SET_LOADING, SET_ISAUTH, SET_USERDATA
} from './views/Login/UserSlice';

// Import Templates
import SqHeader from "./views/Layout/Header/Header";
import SqHome from "./views/Home/Home";
import SqAbout from "./views/About/About";
import SqSignup from "./views/Signup/Signup";
import SqLogin from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import SqFooter from "./views/Layout/Footer/Footer";

// Import Utility Functions
import { getUserData } from "./utils/Users/UsersUtils";

function App() {

	// Aliases
	const location = useLocation();
	const history = useHistory();
	const auth = useAuth();

	// Store state
	const dispatch = useDispatch();
	const isLoading = useSelector(SELECT_LOADING);
	const isAuth = useSelector(SELECT_ISAUTH);

	// Check to see if the user is logged in or has an active session
	useEffect(() => {

		if (!isAuth) {
			checkForUser();
		}
	}, [isAuth]);

	/*
	 * checkForUser - check if a user is already authenticated
	 */
	function checkForUser() {

		getUserData().then(function(response) {

			// User has a session
			if (response.isAuthenticated) {

				handleUserData(response);
			} else {

				dispatch(SET_LOADING(false));
			}
		});
	}

	/*
	 * handleUserData - process userdata if it exists (save in store)
	 */
	function handleUserData(userdata) {

		const authUserData = {
			username: userdata.username,
			email: userdata.email,
			name: userdata.name,
			signupDate: userdata.signupDate
		};

		// Save user data and authentication to the store
		dispatch(SET_USERDATA(authUserData));
		dispatch(SET_ISAUTH(true));

		auth.signin( () => {

			const currLocation = location.pathname;

			// Signup and Login cannot be accessed when already logged in
			if (currLocation === '/signup' || currLocation=== '/login') {
				history.replace('/dashboard');
			}

			dispatch(SET_LOADING(false));
		});
	}

    return (
        <div className="page-frame">
			<SqHeader />

			<Switch>
				<Route path={'/'} exact>
					<SqHome/>
				</Route>
				<Route path={'/about'}>
					<SqAbout/>
				</Route>
				<Route path={'/signup'}>
					<SqSignup isLoading={ isLoading } />
				</Route>
				<Route path={'/login'}>
					<SqLogin isLoading={ isLoading } />
				</Route>
				<PrivateRoute path={'/dashboard'}>
					<Dashboard/>
				</PrivateRoute>
			</Switch>

			<SqFooter isLoading={ isLoading } />
        </div>
    );
}

export default App;
