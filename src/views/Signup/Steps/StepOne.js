import React, { useState } from 'react';

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import {
	setUsername,
	setPassword,
} from '../SignupSlice';

// Import Components
import SqInput from "../../../components/Input/SqInput";

function SqSignupStepOne() {

	const dispatch = useDispatch();

	/*
	 * onUsernameChange - handle change to username
	 */
	function onUsernameChange(userName) {
		dispatch(setUsername(userName));
	}

	/*
	 * onPasswordChange - handle change to username
	 */
	function onPasswordChange(password) {
		dispatch(setPassword(password));
	}

	return (
		<div className={'mod-body-wrapper'}>

			<SqInput label={'Username'}
					 customClass={'username-input'}
					 inputType={'text'}
					 onChange={(value) => onUsernameChange(value) } />

			<SqInput label={'Password'}
					 customClass={'password-input'}
					 inputType={'password'}
					 onChange={(value) => onPasswordChange(value) } />
		</div>
	);
}

export default SqSignupStepOne;
