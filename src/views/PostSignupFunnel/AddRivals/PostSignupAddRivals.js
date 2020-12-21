import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import Components
import SqInput from '../../../components/SqInput/SqInput';
import SqButton from '../../../components/SqButton/SqButton';

// Import Utility Functions
import { findRivalsByUsernameOrEmail } from '../../../utils/Rivals/RivalsUtils';

// Import Constants
//

function PostSignupAddRivals() {

	// Aliases
	const history = useHistory();

	// Local state / variables
	const [rivalNameTimeout, setRivalNameTimeout] = useState();

	const rivalLabel = 'Find a Rival';
	const rivalPlaceholder = 'Enter Username or Email';
	let rivalDefaultVal = ''; // TODO: This needs to come from the Store


	/*
	 * onRivalNameChange - handle changes to rival name input
	 */
	function onRivalNameChange(inputName) {

		console.log('onRivalNameChange()');
		console.log(inputName);

		// Clear usernameTimeout when user types
		if (rivalNameTimeout) {
			clearTimeout(rivalNameTimeout);
		}



		// update the store with new input

		// query API for matching names
		// Set a timeout to check for username availability
		if (inputName && inputName.length > 0) {
			setRivalNameTimeout(setTimeout(
				() => getRivalOptions(inputName),
				1500
			));
		}
	}

	/*
	 * getRivalOptions - get rival options from API
	 */
	function getRivalOptions(inputName) {

		console.log('getRivalOptions()');
		console.log(inputName);

		findRivalsByUsernameOrEmail(inputName).then(function (response) {

			console.log('response');
			console.log(response);
		});
	}

	/*
	 * handleSkip - user clicked Skip, proceed to dashboard
	 */
	function handleSkip() {
		history.push('/dashboard');
	}

	/*
	 * isContinueDisabled - is the continue button disabled
	 */
	function isContinueDisabled() {

		return true;
	}

	/*
	 * handleContinue - continue to next step
	 */
	function handleContinue() {

	}


	return (
		<div className={ 'general-module post-signup-rivals' }>
			<div className={ 'mod-header-wrapper' }>
				<h2>Add Rivals</h2>
			</div>
			<div className={ 'mod-body-wrapper' }>
				<p>To start squabbling, you'll need to find a Rival. Search for one below using a Username or Email address.</p>
				<SqInput placeholder={ rivalPlaceholder }
						 label={ rivalLabel }
						 customClass={ 'rival-name-input' }
						 defaultValue={ rivalDefaultVal }
						 inputType={ 'password' }
						 onChange={ (value) => onRivalNameChange(value) } />
			</div>
			<div className={ 'mod-footer-wrapper action-container' }>
				<span className={ 'secondary-action' }
					  onClick={ () => handleSkip() }>Skip</span>
				<SqButton buttonText={ 'Continue' }
						  buttonType={ 'button-general' }
						  onClick={ () => handleContinue() }
						  isDisabled={ isContinueDisabled() } />
			</div>
		</div>
	);
}

export default PostSignupAddRivals;
