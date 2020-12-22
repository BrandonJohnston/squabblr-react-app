import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';

import SignupReducer from '../views/Signup/SignupSlice';
import UserReducer from '../views/Login/UserSlice';
import PostSignupReducer from '../views/PostSignupFunnel/PostSignupSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		signup: SignupReducer,
		user: UserReducer,
		postSignup: PostSignupReducer
	}
});
