import React, { useState, useEffect, useRef } from 'react';
import SqTooltip from "../Tooltip/SqTooltip";

function SqIcon(props) {

	/*
	 * (@string) icon - the icon to use
	 * (@boolean) hasTooltip - does the icon include a tooltip
     * (@string) tooltipClass - class to put on the tooltip component
	 * (@string) tooltipText - text for the tooltip
     * (@boolean) outsideClick - should outside click close the tooltip
	 */

    const [showTooltip, setshowTooltip] = useState(false);
    const myRef = useRef();

    /*
     * handleClickOutside - handle clicks outside of icon / content (hide the tooltip)
     */ 
    const handleClickOutside = e => {
        if (props.outsideClick && !myRef.current.contains(e.target)) {
            setshowTooltip(false);
        }
    }

    /*
     * handleClickInside - handle clicks inside of icon / content (show the tooltip)
     */ 
    const handleClickInside = () => {
        const tooltip = props.hasTooltip ? !showTooltip : false;
        setshowTooltip(tooltip);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

	/*
	 * handleClick - user clicked the icon - show the tooltip
	 */
	function handleClick() {
        console.log('handleClick()');
        const tooltip = props.hasTooltip ? !showTooltip : false;
        setshowTooltip(tooltip);
	}

	return (
        <span className={ 'sq-icon-wrapper' }
              ref={myRef}>
                <span className={ 'icon' } onClick={ () => handleClickInside() }>X</span>
                {props.hasTooltip && showTooltip &&
                    <SqTooltip type={ 'info' }
                               position={ 'bottom-right' } 
                               customClass={ props.tooltipClass }>
                        <p>{ props.tooltipText }</p>
                    </SqTooltip>
                }
			</span>
	);
}

export default SqIcon;
