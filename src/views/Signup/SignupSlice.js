import { createSlice } from '@reduxjs/toolkit';

export const SignupSlice = createSlice({
	name: 'signup',
	initialState: {
		step: 1,
	},
	reducers: {
		incrementStep: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.step += 1;
		},
		decrementStep: state => {
			state.step -= 1;
		}
	},
});

export const { incrementStep, decrementStep } = SignupSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStep = state => state.signup.step;

export default SignupSlice.reducer;
