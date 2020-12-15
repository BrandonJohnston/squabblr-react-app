import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
	name: 'user',
	initialState: {
		isLoading: true,
		userData: null,
		isAuthenticated: false
	},
	reducers: {
		SET_LOADING: (state, action) => {
			state.isLoading = action.payload;
		},
		SET_USERDATA: (state, action) => {
			state.userData = action.payload;
		},
		SET_ISAUTH: (state, action) => {
			state.isAuthenticated = action.payload;
		}
	}
});

export const { SET_LOADING, SET_USERDATA, SET_ISAUTH } = UserSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const SELECT_LOADING = state => state.user.isLoading;
export const SELECT_USERDATA = state => state.user.userData;
export const SELECT_ISAUTH = state => state.user.isAuthenticated;

export default UserSlice.reducer;
