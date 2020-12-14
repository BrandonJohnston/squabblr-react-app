import React, { useState } from 'react';

function SqInput(props) {

	/*
	 * (@string) value - pre-defined input value
	 * (@string) label - input element label text
	 * (@string) placeholder - placeholder text
	 * (@string) customClass - custom class applied to input wrapper
	 * (@string) inputType - type of input element (text, number, etc)
	 * (@string) defaultValue - default value for input element
	 * (@function) onChange - function to call when input value changes
	 * (@function) onBlur - function to call when user blur input
	 */

	const [inputFilled, setInputFilled] = useState(false);

	/*
	 * handleChange - call props function on input change
	 */
	function handleChange(event) {

		const val = event.target.value;
		setInputFilled(val.length > 0);

		if (props.onChange) {
			props.onChange(val);
		}
	}

	/*
	 * handleFocus - handle focus / blur events
	 */
	function handleFocus(event) {

		if (props.onBlur) {
			const val = event && event.target ? event.target.value : '';
			props.onBlur(val);
		}
	}

	return (
		<div className={ 'sq-input-wrapper ' + props.customClass +
			 (inputFilled ? ' input-filled' : '') +
			 (props.icon ? ' has-icon' : '') +
			 (props.invalid ? ' input-invalid' : '') }
			 >
			<label className={'input-label'}>
				{props.label &&
					<p className={'label-text'}>{ props.label }</p>
				}
				<div className={'input-wrapper'}>
					<input className={'sq-input'}
						   type={ props.inputType ? props.inputType : 'text' }
						   placeholder={ props.placeholder ? props.placeholder : '' } defaultValue={ props.defaultValue }
						   onFocus={ (e) => handleFocus(e) }
						   onBlur={ (e) => handleFocus(e) }
						   onChange={ (e) => handleChange(e) }
					/>
					{props.icon}
				</div>
			</label>
		</div>
	);
}

export default SqInput;
