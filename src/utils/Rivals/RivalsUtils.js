import { API_CONSTANTS } from '../ApiConstants';

/*
 * findRivalsByUsernameOrEmail - query the API for users with entered name or email
 */
export const findRivalsByUsernameOrEmail = async(rival) => {

	const url = API_CONSTANTS.RIVALS.GET_RIVAL_OPTIONS + `/${rival}`;

	const response = await fetch(url, {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return response.json();
}
