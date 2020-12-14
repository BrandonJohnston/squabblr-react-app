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
