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

/*
 * addRivals - POST new rivals for a user
 */
export const addRivals = async(rivals) => {

	const url = API_CONSTANTS.RIVALS.POST_ADD_RIVALS;
	const payload = {
		rivalIds: []
	};

	for (let i = 0; i < rivals.length; i++) {
		payload.rivalIds.push(rivals[i].id);
	}

	const response = await fetch(url, {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	return response.json();
}
