import React from 'react';
import { useHistory /*, useLocation*/ } from 'react-router-dom';
import { useAuth } from "../../utils/Auth/AuthUtils";

function SqLogin() {

	let history = useHistory();
	// let location = useLocation();
	let auth = useAuth();

	// let { from } = location.state || { from: { pathname: "/" } };

	function handleLogin() {
		auth.signin( () => {
			history.replace('/dashboard');
		});
	}

	return (
		<div className={'general-module about-page'}>
			<div className={'mod-header-wrapper'}>
				<h2>Login</h2>
			</div>
			<div className={'mod-body-wrapper'}>
				<button onClick={ () => handleLogin() }>Login</button>
			</div>
		</div>
	);
}

export default SqLogin;
