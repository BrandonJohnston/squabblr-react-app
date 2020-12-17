import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from "../../utils/Auth/AuthUtils";

// Import Templates
import PostSignupAddRivals from "./AddRivals/PostSignupAddRivals";


function PostSignupFunnel() {

	// Aliases
	const match = useRouteMatch();

	return (
		<div className={'general-module dashboard'}>
			<div className={'mod-header-wrapper'}>
				<h2>Post Signup Funnel</h2>
			</div>
			<div className={'mod-body-wrapper'}>
				post signup funnel - add your first rival

				<Switch>
					<PrivateRoute path={`${match.path}/rivals`}>
						<PostSignupAddRivals />
					</PrivateRoute>
					<PrivateRoute path={`${match.path}/squabble`}>
						<p>subroute two</p>
					</PrivateRoute>
				</Switch>
			</div>
		</div>
	);
}

export default PostSignupFunnel;
