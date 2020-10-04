import { createSlice } from '@reduxjs/toolkit';

export const SignupSlice = createSlice({
	name: 'signup',
	initialState: {
		step: 1,
		username: null,
		password: null,
		email: null
	},
	reducers: {
		INCREMENT_STEP: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.step += 1;
		},
		DECREMENT_STEP: state => {
			state.step -= 1;
		},
		SET_USERNAME: (state, action) => {
			state.username = action.payload;
		},
		SET_PASSWORD: (state, action) => {
			state.password = action.payload;
		},
		SET_EMAIL: (state, action) => {
			state.email = action.payload;
		}
	},
});

export const { INCREMENT_STEP, DECREMENT_STEP, SET_USERNAME, SET_PASSWORD, SET_EMAIL } = SignupSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SELECT_STEP = state => state.signup.step;
export const SELECT_USERNAME = state => state.signup.username;
export const SELECT_EMAIL = state => state.signup.email;

export default SignupSlice.reducer;
