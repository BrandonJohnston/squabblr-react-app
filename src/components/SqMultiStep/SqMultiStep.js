import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function SqMultiStep(props) {

	/*
	 * (@string) customClass - custom class applied to tooltip wrapper
	 * (@string) text - text to display in the tooltip (look at doing this as <children>
	 * (@string) position - position of tooltip (left, right, top, bottom)
	 * (@string) headerText - text for the popover header
	 */

	// Aliases
	const location = useLocation();
	const history = useHistory();

	// Local state
	const [stepHeaders, setStepHeaders] = useState([]);


	/**************************************************************************
	 * Create useEffect functions
	 *************************************************************************/
	// Handle updates to Steps - build the step headers nav links
	useEffect(() => {

		// console.log('useEffect props.children');
		// console.log(props.children);

		const headers = [];

		props.children.forEach(child => {

			if (child.type.name === 'SqStep') {
				headers.push({
					text: child.props.stepHeader,
					path: child.props.path,
					enabled: child.props.enabled,
					active: child.props.path === location.pathname
				});
			}
		});

		setStepHeaders(headers);

	}, [props.children, location.pathname]);


	function handleHeaderClick(isEnabled, toPath) {

		if (!isEnabled) {
			return;
		}

		history.push(toPath);
	}


	// Don't display if there are no child steps
	if (stepHeaders.length < 1) {
		return null;
	}

	return (
		<div className={ 'multi-step-module' +
			(props.customClass ? ' ' + props.customClass : '') }>

			<div className={ 'multi-step-header' }>
				<ul className={ 'multi-step-nav' }>
					{stepHeaders.map((header, i) =>
						<li key={ i } className={ 'multi-step-nav-item' +
							(header.enabled ? ' enabled' : ' disabled') +
							(header.active ? ' active' : '') }
							onClick={ () => handleHeaderClick(header.enabled, header.path) }>
							<span>{ header.text }</span>
						</li>
					)}
				</ul>
			</div>

			{props.children.map((step, i) =>
				step.type.name === 'SqStep' ? step : null
			)}
		</div>
	);
}

export default SqMultiStep;
