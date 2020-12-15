import { API_CONSTANTS } from "../ApiConstants";

export const checkUsernameIsAvailable = async(name) => {

	const url = API_CONSTANTS.USERS.GET_USERNAME_AVAILABILITY + `/${name}`;

	const response = await fetch(url, {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return response.json();
}

export const createUser = async(userData) => {

	const url = API_CONSTANTS.USERS.POST_USER;

	const response = await fetch(url, {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	});

	return response.json();
}
