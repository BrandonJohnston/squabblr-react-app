import React from 'react';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import {
	SET_USERNAME,
	SET_PASSWORD,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/SqInput/SqInput";
import SqIcon from "../../../components/SqIcon/SqIcon";


function SqSignupStepOne(props) {

	/*
	 * (@string) usernameVal - default value of username input
	 * (@boolean) usernameAvailable - is the username available
	 * (@boolean) usernameInvalid - is the username invalid
	 * (@string) passwordVal - default value of password input
	 * (@boolean) passwordInvalid - is the password invalid
	 */

	// Local state / variables
	const usernameUnavailableText = 'Username is unavailable';
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

	/*
	 * getUsernameIcon - returns an icon for the username input field
	 */
	function getUsernameIcon() {

		if (props.usernameVal && props.usernameVal.length > 0 && props.usernameInvalid) {
			return getUsernameInvalidIcon();
		} else if (props.usernameVal && props.usernameVal.length > 0 && !props.usernameAvailable) {
			return getUsernameUnavailableIcon();
		}

		return null;
	}

	/*
	 * getUsernameUnavailableIcon - icon for unavailable username
	 */
	function getUsernameUnavailableIcon() {
		return (
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'username-unavail-tip' }
					tooltipType={ 'error' }
					tooltipText={ usernameUnavailableText } />
		);
	}

	/*
	 * getUsernameInvalidIcon - icon for invalid username
	 */
	function getUsernameInvalidIcon() {
		return (
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'username-invalid-tip' }
					tooltipType={ 'error' }
					tooltipText={ usernameErrorText } />
		);
	}

	/*
	 * getPasswordIcon - returns an icon for the password input field
	 */
	function getPasswordIcon() {

		if (props.passwordVal && props.passwordVal.length > 0 && props.passwordInvalid) {
			return getPasswordInvalidIcon();
		}

		return null;
	}

	/*
	 * getPasswordInvalidIcon - icon for invalid password
	 */
	function getPasswordInvalidIcon() {

		return (
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'password-invalid-tip' }
					tooltipType={ 'error' }
					tooltipText={ passwordErrorText } />
		);
	}


	return (
		<div className={'mod-body-wrapper'}>
			<SqInput placeholder={ 'Enter a Username' }
					 label={ 'Username' }
					 customClass={ 'username-input' }
					 defaultValue={ props.usernameVal }
					 inputType={ 'text' }
					 invalid={ !props.usernameAvailable || props.usernameInvalid  }
					 icon={ getUsernameIcon() }
					 onChange={ (value) => onUsernameChange(value) } />

			<SqInput placeholder={ 'Enter a Password' }
					 label={ 'Password' }
					 customClass={ 'password-input' }
					 defaultValue={ props.passwordVal }
					 inputType={ 'password' }
					 invalid={ props.passwordInvalid }
					 icon={ getPasswordIcon() }
					 onChange={ (value) => onPasswordChange(value) } />
		</div>
	);
}

export default SqSignupStepOne;
