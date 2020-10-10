import React, { useState } from 'react';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import {
	SET_USERNAME,
	SET_PASSWORD,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/Input/SqInput";

function SqSignupStepOne() {

	// Local state
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [usernameErrorText, setUsernameErrorText] = useState(false);

	// Store state
	const dispatch = useDispatch();

	/*
	 * onUsernameChange - handle change to username
	 */
	function onUsernameChange(userName) {

		const validUsername = new RegExp(/^[a-zA-Z0-9_-]+$/, 'i');

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
		dispatch(SET_PASSWORD(password));
	}

	return (
		<div className={'mod-body-wrapper'}>

			<SqInput label={ 'Username' }
					 customClass={ 'username-input' }
					 inputType={ 'text' }
					 invalid={ usernameInvalid }
					 errorText={ usernameErrorText }
					 tooltipPosition={'bottom'}
					 onChange={ (value) => onUsernameChange(value) } />

			<SqInput label={ 'Password' }
					 customClass={ 'password-input' }
					 inputType={ 'password' }
					 onChange={ (value) => onPasswordChange(value) } />
		</div>
	);
}

export default SqSignupStepOne;
