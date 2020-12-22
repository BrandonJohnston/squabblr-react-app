import { createSlice } from '@reduxjs/toolkit';

export const PostSignupSlice = createSlice({
	name: 'postSignup',
	initialState: {
		rivalOptions: [],
		addedRivals: []
	},
	reducers: {
		SET_RIVAL_OPTIONS: (state, action) => {
			state.rivalOptions = action.payload;
		},
		SET_RIVALS_TO_ADD: (state, action) => {
			state.addedRivals = action.payload
		}
	}
});

export const { SET_RIVAL_OPTIONS, SET_RIVALS_TO_ADD } = PostSignupSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SELECT_RIVAL_OPTIONS = state => state.postSignup.rivalOptions;
export const SELECT_ADDED_RIVALS = state => state.postSignup.addedRivals;

export default PostSignupSlice.reducer;
