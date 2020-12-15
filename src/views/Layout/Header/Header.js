import React from 'react';

// Import Redux / State management
import { useSelector } from "react-redux";
import { SELECT_LOADING, SELECT_ISAUTH } from "../../Login/UserSlice";

function SqHeader() {

	// Store state
	const isLoading = useSelector(SELECT_LOADING);
	const isAuth = useSelector(SELECT_ISAUTH);

	return (
		<header className={'general-module page-header'}>
			<div className={'mod-header-wrapper'}>
				<h2 className={'header-logo'}>Squabblr</h2>
				{!isLoading && isAuth &&
					<span>User Icon</span>
				}
			</div>
		</header>
	);
}

export default SqHeader;
