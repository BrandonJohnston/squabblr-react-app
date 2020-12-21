import React from 'react';

function SqStep(props) {

	// console.log('SqStep');
	// console.log(props.children);

	/*
	 * (@string) customClass - custom class applied to tooltip wrapper
	 * (@string) stepHeader - step header text
	 */

	return (
		<div className={ 'step' +
			(props.customClass ? ' ' + props.customClass : '') }>

			{ props.children }
		</div>
	);
}

export default SqStep;
