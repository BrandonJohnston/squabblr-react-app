import React, { useState } from 'react';
import { useHistory /*, useLocation*/ } from 'react-router-dom';
import { useAuth } from "../../utils/Auth/AuthUtils";

// Import Redux / State management
import { useDispatch } from 'react-redux';
import { SET_USERDATA, SET_ISAUTH } from './UserSlice';

// Import Components
import SqInput from "../../components/Input/SqInput";
import SqButton from "../../components/Button/SqButton";

// Import Utility Functions
import { loginUser } from "../../utils/Users/UsersUtils";

function SqLogin(props) {

	// Aliases
	const history = useHistory();
	// let location = useLocation();
	const auth = useAuth();

	// Store state
	const dispatch = useDispatch();

	// Local state / variables
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [submitButtonProcessing, setSubmitButtonProcessing] = useState(false);

	const usernameLabel = 'Username';
	const usernamePlaceholder = 'Enter Username';
	const passwordLabel = 'Password';
	const passwordPlaceholder = 'Enter Password';
	const loginText = 'Login';


	/*
	 * onUsernameChange - handle change to username input
	 */
	function onUsernameChange(userName) {

		// Username changed, save it to the store
		setUsername(userName);
	}

	/*
	 * onPasswordChange - handle change to password input
	 */
	function onPasswordChange(pw) {

		// Password changed, save it to the store
		setPassword(pw);
	}

	/*
	 * isSubmitDisabled - is the submit button disabled
	 */
	function isSubmitDisabled() {
		const usernameValid = username && username.length > 0;
		const passwordValid = password && password.length > 0;

		return !usernameValid || !passwordValid;
	}

	/*
	 * handleLogin - user has clicked the button to login
	 */
	function handleLogin() {

		if (submitButtonProcessing) {
			return;
		}

		// Set submit button to processing (prevent multiple clicks)
		setSubmitButtonProcessing(true);

		// Prepare data to send to API
		const userData = {
			username: username,
			password: password
		};

		// Call API utility function
		loginUser(userData).then(function (response) {

			console.log('loginUser() response');
			console.log(response);

			if (response.isAuthenticated) {

				const authUserData = {
					username: response.username,
					email: response.email,
					name: response.name,
					signupDate: response.signupDate
				};

				// Save user data and authentication to the store
				dispatch(SET_USERDATA(authUserData));
				dispatch(SET_ISAUTH(true));

				auth.signin( () => {
					history.replace('/dashboard');
				});

			} else {

				// Login failed, reset processing
				setSubmitButtonProcessing(false);

				// TODO: Show some type of login error
			}
		});
	}


	// TODO: Create a loading state
	if (props.isLoading) {
		return (
			<div>Show Loading</div>
		);
	}

	return (
		<div className={'general-module restricted login-page'}>
			<div className={'mod-header-wrapper'}>
				<h2>Login</h2>
			</div>
			<div className={'mod-body-wrapper'}>

				<SqInput placeholder={ usernamePlaceholder }
						 label={ usernameLabel }
						 customClass={ 'username-input' }
						 defaultValue={ username }
						 inputType={ 'text' }
						 onChange={ (value) => onUsernameChange(value) } />

				<SqInput placeholder={ passwordPlaceholder }
						 label={ passwordLabel }
						 customClass={ 'password-input' }
						 defaultValue={ password }
						 inputType={ 'password' }
						 onChange={ (value) => onPasswordChange(value) } />
			</div>
			<div className={'mod-footer-wrapper action-container'}>
				<SqButton buttonText={ loginText }
						  buttonType={ 'button-primary' }
						  onClick={ () => handleLogin() }
						  isDisabled={ isSubmitDisabled() } />
			</div>
		</div>
	);
}

export default SqLogin;
