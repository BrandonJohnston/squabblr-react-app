import React, { useState, useEffect, useRef } from 'react';

// Import Components
import SqTooltip from "../SqTooltip/SqTooltip";

function SqIcon(props) {

	/*
	 * (@string) icon - the icon to use
	 *
	 * (@boolean) hasTooltip - does the icon include a tooltip
     * (@string) tooltipClass - class to put on the tooltip component
	 * (@string) tooltipText - text for the tooltip
	 * (@string) tooltipType - type for the tooltip
	 *
	 * (@boolean) hasPopover - does the icon include a popover
	 *
     * (@boolean) outsideClick - should outside click close the tooltip
	 */

    const [showSubContent, setShowSubContent] = useState(false);
    const myRef = useRef();

    /*
     * handleClickOutside - handle clicks outside of icon / content (hide the tooltip)
     */
    const handleClickOutside = e => {
        if (props.outsideClick && !myRef.current.contains(e.target)) {
			setShowSubContent(false);
        }
    }

    /*
     * handleClickInside - handle clicks inside of icon / content (show the tooltip)
     */
    const handleClickInside = () => {
        const subContent = props.hasTooltip || props.hasPopover ? !showSubContent : false;
		setShowSubContent(subContent);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });


	return (
        <span className={ 'sq-icon-wrapper' }
              ref={ myRef }
			  onClick={ () => handleClickInside() }>
                <span className={ 'icon' }>X</span>
                {props.hasTooltip && showSubContent &&
                    <SqTooltip type={ props.tooltipType ? props.tooltipType : 'info' }
                               position={ 'bottom-right' }
                               customClass={ props.tooltipClass }>
                        <p>{ props.tooltipText }</p>
                    </SqTooltip>
                }
				{props.hasPopover && showSubContent &&
					props.children
				}
			</span>
	);
}

export default SqIcon;
