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

// Import Constants
import { LETTER_NUMBER_REGEX, LETTER_NUMBER_SPECIAL_REGEX } from "../../utils/GeneralConstants";

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
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [passwordInvalid, setPasswordInvalid] = useState(false);
	const [backButtonDisabled, setbackButtonDisabled] = useState(step === 1);

	// Handle updates to username
	useEffect(() => {
		onUsernameChange(username);
	}, [username]);

	// Handle updates to password
	useEffect(() => {
		onPasswordChange(password);
	}, [password]);

	// TODO: Add effects for email and name (name may not need one)

	/*
	 * onUsernameChange - handle change to username
	 */
	function onUsernameChange(userName) {

		const validUsername = new RegExp(LETTER_NUMBER_REGEX, 'i');

		if (validUsername.test(userName) || userName.length === 0) {

			// Username is valid, hide error
			setUsernameInvalid(false);

		} else {

			// Username is not valid, display an error
			setUsernameInvalid(true);
		}
	}

	/*
	 * onPasswordChange - handle change to password input
	 */
	function onPasswordChange(password) {

		const validPassword = new RegExp(LETTER_NUMBER_SPECIAL_REGEX, 'i');

		if (validPassword.test(password) || password.length === 0) {

			// Password is valid, hide error
			setPasswordInvalid(false);

		} else {

			// Password is not valid, display an error
			setPasswordInvalid(true);
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

	return (
		<div className={'general-module restricted signup-page'}>
			<div className={'mod-header-wrapper'}>
				<h2>Signup</h2>
			</div>
			{step === 1 &&
				<SqSignupStepOne usernameVal={ username } 
								 usernameInvalid={ usernameInvalid }
								 passwordVal={ password } 
								 passwordInvalid={ passwordInvalid } />
			}
			{step === 2 &&
				<SqSignupStepTwo emailVal={ email } 
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
							isDisabled={ !username || !password } />
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
