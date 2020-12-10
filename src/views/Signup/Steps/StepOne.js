import React from 'react';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import {
	SET_USERNAME,
	SET_PASSWORD,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/Input/SqInput";

function SqSignupStepOne(props) {

	/*
	 * (@string) usernameVal - default value of username input
	 * (@boolean) usernameInvalid - is the username invalid
	 * (@string) passwordVal - default value of password input
	 * (@boolean) passwordInvalid - is the password invalid
	 */

	// Local state / variables
	const usernameErrorText = 'Username can only contain letters, numbers, and "-" or "_"';
	const passwordErrorText = 'Password is invalid';

	// Store state
	const dispatch = useDispatch();

	/*
	 * onUsernameChange - handle change to username input
	 */
	function onUsernameChange(userName) {

		// Username changed, save it to the store
		dispatch(SET_USERNAME(userName));
	}

	/*
	 * onPasswordChange - handle change to password input
	 */
	function onPasswordChange(password) {

		// Password changed, save it to the store
		dispatch(SET_PASSWORD(password));
	}

	return (
		<div className={'mod-body-wrapper'}>
			<SqInput placeholder={ 'Enter a Username' }
					 label={ 'Username' }
					 customClass={ 'username-input' }
					 defaultValue={ props.usernameVal }
					 inputType={ 'text' }
					 invalid={ props.usernameInvalid }
					 errorText={ usernameErrorText }
					 tooltipPosition={ 'bottom' }
					 onChange={ (value) => onUsernameChange(value) } />

			<SqInput placeholder={ 'Enter a Password' }
					 label={ 'Password' }
					 customClass={ 'password-input' }
					 defaultValue={ props.passwordVal }
					 inputType={ 'password' }
					 invalid={ props.passwordInvalid }
					 errorText={ passwordErrorText }
					 tooltipPosition={ 'bottom' }
					 onChange={ (value) => onPasswordChange(value) } />
		</div>
	);
}

export default SqSignupStepOne;
