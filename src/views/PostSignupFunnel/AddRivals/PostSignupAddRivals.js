import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_RIVAL_OPTIONS,
	SELECT_RIVAL_OPTIONS,
	SELECT_ADDED_RIVALS
} from '../PostSignupSlice';

// Import Components
import SqInput from '../../../components/SqInput/SqInput';
import SqButton from '../../../components/SqButton/SqButton';
import RivalsList from '../../../components/RivalsList/RivalsList';

// Import Utility Functions
import { findRivalsByUsernameOrEmail, addRivals } from '../../../utils/Rivals/RivalsUtils';

// Import Constants
//


function PostSignupAddRivals() {

	// Aliases
	const history = useHistory();
	const dispatch = useDispatch();

	// Store state
	const rivalOptions = useSelector(SELECT_RIVAL_OPTIONS);
	const addedRivals = useSelector(SELECT_ADDED_RIVALS);


	// Local state / variables
	const [rivalNameInput, setRivalNameInput] = useState('');
	const [rivalNameTimeout, setRivalNameTimeout] = useState();
	const [rivalOptionsLoading, setRivalOptionsLoading] = useState(false);
	const [rivalOptionsMap, setRivalOptionsMap] = useState({});


	const rivalLabel = 'Find a Rival';
	const rivalPlaceholder = 'Enter Username or Email';
	const rivalDefaultVal = '';


	/*
	 * onRivalNameChange - handle changes to rival name input
	 */
	function onRivalNameChange(inputName) {

		// Clear usernameTimeout when user types
		if (rivalNameTimeout) {
			clearTimeout(rivalNameTimeout);
		}

		// save current input to local state
		setRivalNameInput(inputName);
		setRivalOptionsLoading(true);

		// query API for matching names
		// Set a timeout to check for username availability
		if (inputName && inputName.length > 0) {
			setRivalNameTimeout(setTimeout(
				() => getRivalOptions(inputName),
				1500
			));
		}

		if (inputName.length === 0) {
			dispatch(SET_RIVAL_OPTIONS([]));
			setRivalOptionsLoading(false);
		}
	}

	/*
	 * getRivalOptions - get rival options from API
	 */
	function getRivalOptions(inputName) {

		if (rivalOptionsMap[inputName]) {

			// set map data into the Store
			dispatch(SET_RIVAL_OPTIONS(rivalOptionsMap[inputName]));

			// no longer loading
			setRivalOptionsLoading(false);

		} else {

			findRivalsByUsernameOrEmail(inputName).then(function (response) {

				// update map with new responses
				const mapCopy = {...rivalOptionsMap};
				mapCopy[inputName] = response.usernames;
				setRivalOptionsMap(mapCopy);

				// set map data into the Store
				dispatch(SET_RIVAL_OPTIONS(mapCopy[inputName]));

				// no longer loading
				setRivalOptionsLoading(false);
			});
		}
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

		return addedRivals.length === 0;
	}

	/*
	 * handleContinue - continue to next step
	 */
	function handleContinue() {

		console.log('handleContinue()');

		if (addedRivals.length < 1) {
			return;
		}

		addRivals(addedRivals).then(function(response) {
			console.log('addRivals response');
			console.log(response);

			// TODO: Save new rivals to store
			//

			// Move to next state
			history.push('/post-signup/squabble');
		});

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
						 inputType={ 'text' }
						 onChange={ (value) => onRivalNameChange(value) } />

				<RivalsList rivals={ rivalOptions }
							shouldShowResults={ rivalNameInput.length > 0 }
							isLoading={ rivalOptionsLoading } />
			</div>
			<div className={ 'mod-footer-wrapper action-container' }>
				<span className={ 'secondary-action' }
					  onClick={ () => handleSkip() }>Skip</span>
				<SqButton buttonText={ 'Continue' }
						  buttonType={ 'button-primary' }
						  onClick={ () => handleContinue() }
						  isDisabled={ isContinueDisabled() } />
			</div>
		</div>
	);
}

export default PostSignupAddRivals;
