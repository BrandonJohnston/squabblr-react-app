import React from 'react';

// Import Redux / State management
import { useSelector } from "react-redux";
import { SELECT_LOADING, SELECT_ISAUTH, SELECT_USERDATA } from "../../Login/UserSlice";

// Import Templates
import HeaderUserMenu from "../../../components/HeaderUserMenu/HeaderUserMenu";

// Import Components
import SqIcon from "../../../components/SqIcon/SqIcon";
import SqPopover from "../../../components/SqPopover/SqPopover";

function SqHeader() {

	// Store state
	const isLoading = useSelector(SELECT_LOADING);
	const isAuth = useSelector(SELECT_ISAUTH);
	const userData = useSelector(SELECT_USERDATA);

	/*
	 * getUserMenuIcon
	 */
	function getUserMenuIcon() {
		return(
			<SqIcon hasPopover={ true }
					outsideClick={ true }>
				<SqPopover customClass={ 'user-actions-popover' }
						   headerText={ userData.username }
						   position={ 'bottom-right' }>
					<HeaderUserMenu/>
				</SqPopover>
			</SqIcon>
		);
	}

	return (
		<header className={'general-module page-header'}>
			<div className={'mod-header-wrapper'}>
				<h2 className={'header-logo'}>Squabblr</h2>
				{!isLoading && isAuth &&
					<div className={ 'user-menu-icon' }>
						{ getUserMenuIcon() }
					</div>
				}
			</div>
		</header>
	);
}

export default SqHeader;
