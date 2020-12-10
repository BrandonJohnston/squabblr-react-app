import React, { useState, useEffect } from 'react';

// Import Redux / State management
import { useDispatch } from 'react-redux';
import {
	SET_EMAIL,
	SET_NAME,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/Input/SqInput";
import SqTooltip from "../../../components/Tooltip/SqTooltip";

// Import Constants
import { EMAIL_REGEX } from "../../../utils/GeneralConstants";
import SqIcon from '../../../components/Icon/SqIcon';

function SqSignupStepTwo(props) {

	/*
	 * (@string) emailVal - default value of email input
	 * (@string) nameVal - defualt value of name input
	 */

	// Local state
	const [emailInvalid, setEmailInvalid] = useState(false);
	useEffect(() => {

		// Check email validity on render (such as returning to signup from a different view)
		if (props.hasOwnProperty('emailVal') && props.emailVal !== null && props.emailVal.length > 0) {
			onEmailBlur(props.emailVal);
		}
	}, [props.emailVal]);

	const [emailErrorText, setEmailErrorText] = useState('');

	// Store state
	const dispatch = useDispatch();

	/*
	 * onEmailChange - handle change to email input
	 */
	function onEmailBlur(email) {

		const validEmail = new RegExp(EMAIL_REGEX, 'i');

		if (validEmail.test(email) || email.length === 0) {

			if (emailInvalid) {
				// email was invalid - reset error tooltip
				setEmailInvalid(false);
				setEmailErrorText('');
			}

		} else {

			// Email is not valid, display an error
			setEmailInvalid(true);
			setEmailErrorText('Email is invalid');
		}

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
	 * getEmailIcon - renders an icon and tooltip for email input field
	 */
	function getEmailIcon() {
		return(
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'email-tip' }
					tooltipText={ 'Your email address is optional; however, we may it use to communicate with you from time to time or to provide functionality such as reseting your password.' } />
		);
	}

	/*
	 * getNameIcon - renders an icon and tooltip for name input field
	 */
	function getNameIcon() {
		return(
			<SqIcon hasTooltip={ true }
					outsideClick={ true }
					tooltipClass={ 'name-tip' }
					tooltipText={ 'Your name is optional; however, we may it use to customize content for you.' } />
		);
	}

	return (
		<div className={'mod-body-wrapper'}>
			<SqInput placeholder={ 'Enter an Email' }
					 label={ 'Email' }
					 customClass={ 'email-input' }
					 defaultValue={ props.emailVal }
					 inputType={ 'email' }
					 invalid={ emailInvalid }
					 errorText={ emailErrorText }
					 tooltipPosition={ 'bottom' }
					 icon={ getEmailIcon() }
					 onBlur={ (value) => onEmailBlur(value) } />

			<SqInput placeholder={ 'Enter your Name' }
					 label={ 'Name' }
					 customClass={ 'name-input' }
					 defaultValue={ props.nameVal }
					 inputType={ 'text' }
					 icon={ getNameIcon() }
					 onChange={ (value) => onNameChange(value) } />
		</div>
	);
}

export default SqSignupStepTwo;
