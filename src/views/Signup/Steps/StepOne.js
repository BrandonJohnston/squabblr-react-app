import React, { useState } from 'react';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import {
	SET_USERNAME,
	SET_PASSWORD,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/Input/SqInput";

// Import Constants
import { LETTER_NUMBER_REGEX, LETTER_NUMBER_SPECIAL_REGEX } from "../../../utils/GeneralConstants";

function SqSignupStepOne() {

	// Local state
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [usernameErrorText, setUsernameErrorText] = useState('');
	const [passwordInvalid, setPasswordInvalid] = useState(false);
	const [passwordErrorText, setPasswordErrorText] = useState('');

	// Store state
	const dispatch = useDispatch();

	/*
	 * onUsernameChange - handle change to username
	 */
	function onUsernameChange(userName) {

		const validUsername = new RegExp(LETTER_NUMBER_REGEX, 'i');

		if (validUsername.test(userName) || userName.length === 0) {

			if (usernameInvalid) {
				setUsernameInvalid(false);
				setUsernameErrorText('');
			}

			// Username is valid, save it to the store
			dispatch(SET_USERNAME(userName));

		} else {

			// Username is not valid, display an error
			setUsernameInvalid(true);
			setUsernameErrorText('Username can only contain letters, numbers, and "-" or "_"');
		}
	}

	/*
	 * onPasswordChange - handle change to username
	 */
	function onPasswordChange(password) {

		const validPassword = new RegExp(LETTER_NUMBER_SPECIAL_REGEX, 'i');


		if (validPassword.test(password) || password.length === 0) {

			if (passwordInvalid) {
				setPasswordInvalid(false);
				setPasswordErrorText('');
			}

			// Password is valid, save it to the store
			dispatch(SET_PASSWORD(password));

		} else {

			// Password is not valid, display an error
			setPasswordInvalid(true);
			setPasswordErrorText('Password is invalid');
		}
	}

	return (
		<div className={'mod-body-wrapper'}>

			<SqInput label={ 'Username' }
					 customClass={ 'username-input' }
					 inputType={ 'text' }
					 invalid={ usernameInvalid }
					 errorText={ usernameErrorText }
					 tooltipPosition={ 'bottom' }
					 onChange={ (value) => onUsernameChange(value) } />

			<SqInput label={ 'Password' }
					 customClass={ 'password-input' }
					 inputType={ 'password' }
					 invalid={ passwordInvalid }
					 errorText={ passwordErrorText }
					 tooltipPosition={ 'bottom' }
					 onChange={ (value) => onPasswordChange(value) } />
		</div>
	);
}

export default SqSignupStepOne;
