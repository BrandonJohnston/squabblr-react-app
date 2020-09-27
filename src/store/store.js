import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';

import SignupReducer from '../views/Signup/SignupSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		signup: SignupReducer
	},
});
