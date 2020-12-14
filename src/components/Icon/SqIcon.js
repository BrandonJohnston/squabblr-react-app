import React, { useState, useEffect, useRef } from 'react';
import SqTooltip from "../Tooltip/SqTooltip";

function SqIcon(props) {

	/*
	 * (@string) icon - the icon to use
	 * (@boolean) hasTooltip - does the icon include a tooltip
     * (@string) tooltipClass - class to put on the tooltip component
	 * (@string) tooltipText - text for the tooltip
	 * (@string) tooltipType - type for the tooltip
     * (@boolean) outsideClick - should outside click close the tooltip
	 */

    const [showTooltip, setShowTooltip] = useState(false);
    const myRef = useRef();

    /*
     * handleClickOutside - handle clicks outside of icon / content (hide the tooltip)
     */
    const handleClickOutside = e => {
        if (props.outsideClick && !myRef.current.contains(e.target)) {
            setShowTooltip(false);
        }
    }

    /*
     * handleClickInside - handle clicks inside of icon / content (show the tooltip)
     */
    const handleClickInside = () => {
        const tooltip = props.hasTooltip ? !showTooltip : false;
        setShowTooltip(tooltip);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });


	return (
        <span className={ 'sq-icon-wrapper' }
              ref={myRef}>
                <span className={ 'icon' } onClick={ () => handleClickInside() }>X</span>
                {props.hasTooltip && showTooltip &&
                    <SqTooltip type={ props.tooltipType ? props.tooltipType : 'info' }
                               position={ 'bottom-right' }
                               customClass={ props.tooltipClass }>
                        <p>{ props.tooltipText }</p>
                    </SqTooltip>
                }
			</span>
	);
}

export default SqIcon;
