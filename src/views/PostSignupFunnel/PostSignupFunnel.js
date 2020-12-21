import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from '../../utils/Auth/AuthUtils';

// Import Templates
import PostSignupAddRivals from './AddRivals/PostSignupAddRivals';
import PostSignupAddSquabble from './AddSquabble/PostSignupAddSquabble';

// Import Components
import SqMultiStep from '../../components/SqMultiStep/SqMultiStep';
import SqStep from '../../components/SqStep/SqStep';


function PostSignupFunnel() {

	// Aliases
	const match = useRouteMatch();

	return (
		<Switch>
			<SqMultiStep customClass={ 'post-signup-module' }>
				<SqStep stepHeader={ 'Add Rivals' }
						path={ `${match.path}/rivals` }
						enabled={ true }>
					<PrivateRoute path={ `${match.path}/rivals` }>
						<PostSignupAddRivals />
					</PrivateRoute>
				</SqStep>
				<SqStep stepHeader={ 'Start a Squabble' }
						path={ `${match.path}/squabble` }
						enabled={ true }>
					<PrivateRoute path={ `${match.path}/squabble` }>
						<PostSignupAddSquabble />
					</PrivateRoute>
				</SqStep>
			</SqMultiStep>
		</Switch>
	);
}

export default PostSignupFunnel;
