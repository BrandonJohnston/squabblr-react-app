import React from 'react';

function SqButton(props) {

	/*
	 * (@string) buttonType - type of button - changes visual style
	 * (@string) buttonText - text displayed inside button
	 * (@string) customClass - custom class applied to input wrapper
	 * (@boolean) isDisabled - determines if button is in disabled state
	 * (@boolean) isProcessing - determines if button is in processing state
	 * (@function) onChange - function to call when button is clicked
	 */

	/*
	 * handleClick - call click function if button is not disabled and is not processing
	 */
	function handleClick() {
		if (!props.isDisabled && !props.isProcessing) {
			props.onClick();
		}
	}

	return (
		<div className={
			'button ' + props.buttonType +
			(props.customClass ? ' ' + props.customClass : '') +
			(props.isDisabled ? ' disabled' : '') +
			(props.isProcessing ? ' processing' : '')
		}
			 onClick={ () => handleClick() }>
			<span className={'button-text'}>
				{ props.buttonText }
			</span>
		</div>
	);
}

export default SqButton;
