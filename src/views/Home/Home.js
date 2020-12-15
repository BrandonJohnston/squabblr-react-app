import React from 'react';
import { Link } from 'react-router-dom';

function SqHome() {

	return (
		<div className={'general-module about-page'}>
			<div className={'mod-header-wrapper'}>
				<h2>Home</h2>
			</div>
			<div className={'mod-body-wrapper'}>
				<Link to="/signup">Signup</Link>
			</div>
		</div>
	);
}

export default SqHome;
