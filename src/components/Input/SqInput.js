import React, { useState } from 'react';
import SqTooltip from "../Tooltip/SqTooltip";

function SqInput(props) {

	/*
	 * (@string) value - pre-defined input value
	 * (@string) label - input element label text
	 * (@string) customClass - custom class applied to input wrapper
	 * (@string) inputType - type of input element (text, number, etc)
	 * (@function) onChange - function to call when input value changes
	 * (@function) onBlur - function to call when user blur input
	 */

	const [inputFocus, setInputFocus] = useState(false);
	const [inputFilled, setInputFilled] = useState(false);

	/*
	 * handleChange - call props function on input change
	 */
	function handleChange(event) {

		const val = event.target.value;
		setInputFilled(val.length > 0);
		props.onChange(val);
	}


	/*
	 * handleFocus - handle focus / blur events
	 */
	function handleFocus(focus) {
		setInputFocus(focus);

		if (props.onBlur) {
			props.onBlur();
		}
	}

	return (
		<div className={ 'sq-input-wrapper ' + props.customClass +
			 (inputFocus ? ' input-focus' : '') +
			 (inputFilled ? ' input-filled' : '') +
			 (props.invalid ? ' input-invalid' : '') }
			 >

			<label className={'input-label'}>
				{props.label &&
					<p className={'label-text'}>{ props.label }</p>
				}
				<div className={'input-wrapper'}>
					<input className={'sq-input'}
						   type={ props.inputType ? props.inputType : 'text' }
						   onFocus={ () => handleFocus(true) }
						   onBlur={ () => handleFocus(false) }
						   onChange={ (e) => handleChange(e) }
					/>
					{props.invalid &&
						<SqTooltip type={ 'error' }
								   position={ props.tooltipPosition }>
							<p>{ props.errorText }</p>
						</SqTooltip>
					}
				</div>
			</label>
		</div>
	);
}

export default SqInput;
