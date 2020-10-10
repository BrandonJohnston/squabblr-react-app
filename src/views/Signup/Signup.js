import React, { useState } from 'react';

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import {
	INCREMENT_STEP, DECREMENT_STEP,
	SELECT_STEP, SELECT_USERNAME, SELECT_EMAIL,
} from './SignupSlice';

// Import Templates
import SqSignupStepOne from "./Steps/StepOne";
import SqSignupStepTwo from "./Steps/StepTwo";

// Import Components
import SqButton from "../../components/Button/SqButton";

// Signup Function
function SqSignup() {

	// Local state
	const [backButtonDisabled, setbackButtonDisabled] = useState(true);

	// Store state
	const step = useSelector(SELECT_STEP);
	const username = useSelector(SELECT_USERNAME);
	const email = useSelector(SELECT_EMAIL);
	const dispatch = useDispatch();

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
				<SqSignupStepOne/>
			}
			{step === 2 &&
				<SqSignupStepTwo/>
			}
			<div className={'mod-footer-wrapper equal-action-container'}>
				<SqButton buttonText={ 'Back' }
						  buttonType={ 'button-general' }
						  onClick={ () => onBack() }
						  isDisabled={ backButtonDisabled } />
				<SqButton buttonText={ 'Next' }
						  buttonType={ 'button-primary' }
						  onClick={ () => onNext() } />
			</div>
		</div>
	);
}

export default SqSignup;
