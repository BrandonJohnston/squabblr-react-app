import React from 'react';

function SqTooltip(props) {

	/*
	 * (@string) type - tooltip type (error, info, etc)
	 * (@string) text - text to display in the tooltip (look at doing this as <children>
	 * (@string) customClass - custom class applied to tooltip wrapper
	 * (@string) position - position of tooltip (left, right, top, bottom)
	 */

	return (
		<div className={ 'tooltip-wrapper' +
			(props.type ? ' tooltip-' + props.type : '') +
			(props.position ? ' tooltip-' + props.position : ' tooltip-bottom') +
			(props.customClass ? ' ' + props.customClass : '') }>
			<div className={'tooltip-content'}>
				{ props.children }
			</div>
		</div>
	);
}

export default SqTooltip;
