import React, { useState, useEffect } from 'react';

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import {
	INCREMENT_STEP, DECREMENT_STEP,
	SELECT_STEP, SELECT_USERNAME, SELECT_PASSWORD, SELECT_EMAIL, SELECT_NAME,
} from './SignupSlice';

// Import Templates
import SqSignupStepOne from "./Steps/StepOne";
import SqSignupStepTwo from "./Steps/StepTwo";

// Import Components
import SqButton from "../../components/Button/SqButton";

// Import Utility Functions
import { checkUsernameIsAvailable } from "../../utils/Users/UsersUtils";

// Import Constants
import { EMAIL_REGEX, LETTER_NUMBER_REGEX, LETTER_NUMBER_SPECIAL_REGEX } from "../../utils/GeneralConstants";

// Signup Function
function SqSignup() {

	// Store state
	const step = useSelector(SELECT_STEP);
	const username = useSelector(SELECT_USERNAME);
	const password = useSelector(SELECT_PASSWORD);
	const email = useSelector(SELECT_EMAIL);
	const name = useSelector(SELECT_NAME);
	const dispatch = useDispatch();

	// Local state
	const [usernameMap, setUsernameMap] = useState({});
	const [usernameAvailable, setUsernameAvailable] = useState(true);
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [passwordInvalid, setPasswordInvalid] = useState(false);
	const [emailInvalid, setEmailInvalid] = useState(false);
	const [backButtonDisabled, setbackButtonDisabled] = useState(step === 1);
	const [usernameTimeout, setUsernameTimeout] = useState();

	// Handle updates to username
	useEffect(() => {
		onUsernameChange(username);
	}, [username]);

	// Handle updates to password
	useEffect(() => {
		onPasswordChange(password);
	}, [password]);

	// Handle updates to email
	useEffect(() => {
		onEmailChange(email);
	}, [email]);

	// TODO: Add effects for email and name (name may not need one)

	/*
	 * onUsernameChange - handle change to username
	 */
	function onUsernameChange(userName) {

		// Clear usernameTimeout when user types
		if (usernameTimeout) {
			clearTimeout(usernameTimeout);
		}

		// Regex for a valid username
		const validUsername = new RegExp(LETTER_NUMBER_REGEX, 'i');

		if (validUsername.test(userName) || (userName && userName.length === 0)) {

			// Username is valid, hide error
			setUsernameInvalid(false);

		} else {

			// Username is not valid, display an error
			setUsernameInvalid(true);
		}

		// Set a timeout to check for username availability
		if (userName && userName.length > 0) {
			setUsernameTimeout(setTimeout(
				() => processUsername(),
				1500
			));
		}
	}

	/*
	 * onPasswordChange - handle change to password input
	 */
	function onPasswordChange(password) {

		const validPassword = new RegExp(LETTER_NUMBER_SPECIAL_REGEX, 'i');

		if (validPassword.test(password) || (password && password.length === 0)) {

			// Password is valid, hide error
			setPasswordInvalid(false);

		} else {

			// Password is not valid, display an error
			setPasswordInvalid(true);
		}
	}

	/*
	 * onEmailChange - handle change to email input
	 */
	function onEmailChange(email) {

		const validEmail = new RegExp(EMAIL_REGEX, 'i');

		if (validEmail.test(email) || (email && email.length === 0) || !email) {

			if (emailInvalid) {
				// email was invalid - reset error tooltip
				setEmailInvalid(false);
			}

		} else {

			// Email is not valid, display an error
			setEmailInvalid(true);
		}
	}

	/*
	 * onNext - handle 'Next' button clicks
	 */
	function onNext() {

		if (step < 3) {
			dispatch(INCREMENT_STEP());
		}

		// update button state
		setbackButtonDisabled(false);
	}

	/*
	 * onBack - handle 'Back' button clicks
	 */
	function onBack() {

		if (step > 1) {
			dispatch(DECREMENT_STEP(step)).then( (response) => {
				// update button state
				setbackButtonDisabled(response.payload === 1);
			});
		}
	}

	/*
	 * processUsername - check if the entered username is currently available
	 */
	function processUsername() {

		if (usernameMap.hasOwnProperty(username)) {

			// username is saved to map, no need to make an api call
			// update local state from map
			setUsernameAvailable(usernameMap[username]);

		} else {

			checkUsernameIsAvailable(username).then(function (response) {

				// save the response to a map for future reference
				usernameMap[username] = response.isAvailable;
				setUsernameMap(usernameMap);

				// update local state rom api response
				setUsernameAvailable(response.isAvailable);
			});
		}
	}

	/*
	 * isStepOneNextDisabled
	 */
	function isStepOneNextDisabled() {
		const usernameValid = username && username.length > 0 && !usernameInvalid && usernameAvailable;
		const passwordValid = password && password.length > 0 && !passwordInvalid;

		return !usernameValid || !passwordValid;
	}


	return (
		<div className={'general-module restricted signup-page'}>
			<div className={'mod-header-wrapper'}>
				<h2>Signup</h2>
			</div>
			{step === 1 &&
				<SqSignupStepOne usernameVal={ username }
								 usernameAvailable={ usernameAvailable }
								 usernameInvalid={ usernameInvalid }
								 passwordVal={ password }
								 passwordInvalid={ passwordInvalid } />
			}
			{step === 2 &&
				<SqSignupStepTwo emailVal={ email }
								 emailInvalid={ emailInvalid }
								 nameVal={ name } />
			}
			<div className={'mod-footer-wrapper equal-action-container'}>
				<SqButton buttonText={ 'Back' }
						  buttonType={ 'button-general' }
						  onClick={ () => onBack() }
						  isDisabled={ backButtonDisabled } />
				{step === 1 &&
					<SqButton buttonText={ 'Next' }
							buttonType={ 'button-primary' }
							onClick={ () => onNext() }
							isDisabled={ isStepOneNextDisabled() } />
				}
				{step === 2 &&
					<SqButton buttonText={ 'Submit' }
							buttonType={ 'button-primary' }
							onClick={ () => onNext() }
							isDisabled={ !username || !password } />
				}
			</div>
		</div>
	);
}

export default SqSignup;
