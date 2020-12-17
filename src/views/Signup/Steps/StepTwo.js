import React from 'react';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import {
	SET_EMAIL,
	SET_NAME,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/SqInput/SqInput";
import SqIcon from '../../../components/SqIcon/SqIcon';


function SqSignupStepTwo(props) {

	/*
	 * (@string) emailVal - default value of email input
	 * (@boolean) emailInvalid - is the email invalid
	 * (@string) nameVal - default value of name input
	 * (@function) keyDownCallBack - function to process key events
	 */

	// Local state / variables
	const emailTipText = 'Your email address is optional; however, we may it use to communicate with you from time to time or to provide functionality such as resetting your password.';
	const emailErrorText = 'Email is invalid';
	const nameTipText = 'Your name is optional; however, we may it use to customize content for you.';

	// Store state
	const dispatch = useDispatch();

	/*
	 * onEmailChange - handle change to email input
	 */
	function onEmailBlur(email) {

		// Save input value to the store
		dispatch(SET_EMAIL(email));
	}

	/*
	 * onNameChange - handle change to name input
	 */
	function onNameChange(name) {

		// Save name to the store
		dispatch(SET_NAME(name));
	}

	/*
	 * getEmailIcon - return an icon to render in email input field
	 */
	function getEmailIcon() {

		if (props.emailInvalid) {
			return getEmailInvalidIcon();
		} else {
			return getEmailTipIcon();
		}
	}

	/*
	 * getEmailTipIcon - renders an icon and tooltip email info
	 */
	function getEmailTipIcon() {
		return(
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'email-tip' }
					tooltipText={ emailTipText } />
		);
	}

	/*
	 * getEmailInvalidIcon - renders icon and tooltip for invalid email
	 */
	function getEmailInvalidIcon() {
		return(
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'email-invalid-tip' }
					tooltipType={ 'error' }
					tooltipText={ emailErrorText } />
		);
	}

	/*
	 * getNameIcon - renders an icon and tooltip name info
	 */
	function getNameIcon() {
		return(
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'name-tip' }
					tooltipText={ nameTipText } />
		);
	}


	return (
		<div className={'mod-body-wrapper'}>
			<SqInput placeholder={ 'Enter an Email' }
					 label={ 'Email' }
					 customClass={ 'email-input' }
					 defaultValue={ props.emailVal }
					 inputType={ 'email' }
					 invalid={ props.emailInvalid }
					 icon={ getEmailIcon() }
					 onBlur={ (value) => onEmailBlur(value) }
					 onKeyDown={ props.keyDownCallBack }
					 autofocus={ true } />

			<SqInput placeholder={ 'Enter your Name' }
					 label={ 'Name' }
					 customClass={ 'name-input' }
					 defaultValue={ props.nameVal }
					 inputType={ 'text' }
					 icon={ getNameIcon() }
					 onChange={ (value) => onNameChange(value) }
					 onKeyDown={ props.keyDownCallBack } />
		</div>
	);
}

export default SqSignupStepTwo;
