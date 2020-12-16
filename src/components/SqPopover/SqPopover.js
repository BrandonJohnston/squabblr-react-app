import React from 'react';

function SqPopover(props) {

	/*
	 * (@string) customClass - custom class applied to tooltip wrapper
	 * (@string) text - text to display in the tooltip (look at doing this as <children>
	 * (@string) position - position of tooltip (left, right, top, bottom)
	 * (@string) headerText - text for the popover header
	 */

	return (
		<div className={ 'popover-wrapper' +
			(props.position ? ' popover-' + props.position : ' popover-bottom') +
			(props.customClass ? ' ' + props.customClass : '') }>
			<div className={ 'popover-header' }>
				<h3>{ props.headerText }</h3>
			</div>
			<div className={'popover-body'}>
				{ props.children }
			</div>
		</div>
	);
}

export default SqPopover;
