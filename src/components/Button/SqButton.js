import React from 'react';

function SqButton(props) {

	function handleClick() {
		props.onClick();
	}

	return (
		<div className={ 'button ' + props.buttonType } onClick={ () => handleClick() }>
			<span className={'button-text'}>
				{ props.buttonText }
			</span>
		</div>
	);
}

export default SqButton;
