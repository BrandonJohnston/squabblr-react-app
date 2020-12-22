import React from 'react';

// Import Redux / State management
import { useSelector, useDispatch } from 'react-redux';
import { SET_RIVALS_TO_ADD, SELECT_ADDED_RIVALS } from '../../views/PostSignupFunnel/PostSignupSlice'

// Import Utility Functions
//


function RivalsList(props) {

	/*
	 * (@array) rivals - list of rivals to display
	 * (@boolean) shouldShowResults - should results be visible?
	 * (@boolean) isLoading - is the list being updated
	 */

	// Aliases
	const dispatch = useDispatch();

	// Store state
	const addedRivals = useSelector(SELECT_ADDED_RIVALS);


	/*
	 * isRivalAdded - is the rival added
	 */
	function isRivalAdded(rivalId) {

		if (addedRivals.length === 0) {
			return false;
		}

		let isAdded = false;

		for (let i = 0; i < addedRivals.length; i++) {

			if (addedRivals[i].id === rivalId) {
				isAdded = true;
				break;
			}
		}

		return isAdded;
	}


	/*
	 * addRival - add a rival to the list
	 */
	function addRival(idx) {

		const newRival = props.rivals[idx];
		let rivalExists = false;

		// check if the rival already exists in the array
		for (let i = 0; i < addedRivals.length; i++) {

			if (addedRivals[i].id === newRival.id) {
				rivalExists = true;
				break;
			}
		}

		if (!rivalExists) {

			// prepare new rival data
			const rivalsToAdd = [...addedRivals];
			rivalsToAdd.push(newRival);

			// send new rival data to store
			dispatch(SET_RIVALS_TO_ADD(rivalsToAdd));
		}
	}

	/*
	 * removeRival - remove a rival from the list
	 */
	function removeRival(rivalId) {

		// prepare new rival data
		const rivalsCopy = addedRivals.filter(function(rival) {
			return rival.id !== rivalId;
		});

		// send new rival data to store
		dispatch(SET_RIVALS_TO_ADD(rivalsCopy));
	}


	return (
		<div className={ 'rivals-list-module' }>
			<div className={ 'available-rivals' }>
				<h3>Available</h3>
				<ul className={ 'avail-rivals-list' }>

					{props.rivals.length === 0 && !props.shouldShowResults && !props.isLoading &&
						<li className={ 'rivals-help-text' }>
							<span>Search above for new Rivals</span>
						</li>
					}

					{props.rivals.length === 0 && props.isLoading &&
						<li className={ 'rivals-help-text' }>
							<span>Searching</span>
						</li>
					}

					{props.rivals.length === 0 && props.shouldShowResults && !props.isLoading &&
						<li className={ 'rivals-help-text' }>
							<span>No matching Rivals were found</span>
						</li>
					}

					{props.rivals.map((rival, i) =>
						<li key={ i }
							className={ 'rival-list-item' }>
							<span>{ rival.username }</span>
							{!isRivalAdded(rival.id) &&
								<span className={'add-button'}
									  onClick={ () => addRival(i) }>+</span>
							}
							{isRivalAdded(rival.id) &&
								<span className={'remove-button'}
									  onClick={ () => removeRival(rival.id) }>X</span>
							}
						</li>
					)}

				</ul>
			</div>
			<div className={ 'added-rivals' }>
				<h3>Added</h3>
				<ul className={ 'add-rivals-list' }>
					{addedRivals.map((rival, i) =>
						<li key={ i }
							className={ 'rival-list-card' }>
							<div className={ 'rival-icon' }>O</div>
							<p className={ 'rival-username' }>{ rival.username }</p>
							{rival.email &&
								<p className={ 'rival-email' }>{rival.email}</p>
							}
							<span className={'remove-button'}
								  onClick={ () => removeRival(rival.id) }>X</span>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}

export default RivalsList;
