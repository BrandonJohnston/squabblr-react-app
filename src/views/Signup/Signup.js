import React from 'react';

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import {
	incrementStep,
	decrementStep,
	selectStep,
} from './SignupSlice';

// Import Templates
import SqSignupStepOne from "./Steps/StepOne";
import SqSignupStepTwo from "./Steps/StepTwo";

// Import Components
import SqButton from "../../components/Button/SqButton";

// Signup Function
function SqSignup() {

	const step = useSelector(selectStep);
	const dispatch = useDispatch();

	/*
	 * onNext - handle 'Next' button clicks
	 */
	function onNext() {
		if (step < 3) {
			dispatch(incrementStep());
		}
	}

	/*
	 * onBack - handle 'Back' button clicks
	 */
	function onBack() {
		if (step > 1) {
			dispatch(decrementStep());
		}
	}

	return (
		<div className={'general-module restricted signup-page'}>
			<div className={'mod-header-wrapper'}>
				<h2>Signup</h2>
				<p>{ step }</p>
			</div>
			<div className={'mod-body-wrapper'}>
				{step === 1 &&
					<SqSignupStepOne/>
				}
				{step === 2 &&
					<SqSignupStepTwo/>
				}
			</div>
			<div className={'mod-footer-wrapper equal-action-container'}>
				<SqButton buttonText={'Back'}
						  buttonType={'button-general'}
						  onClick={ () => onBack() } />
				<SqButton buttonText={'Next'}
						  buttonType={'button-primary'}
						  onClick={ () => onNext() } />
			</div>
		</div>
	);
}

export default SqSignup;
