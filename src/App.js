import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from "./utils/Auth/AuthUtils";

import SqHeader from "./views/Layout/Header/Header";
import SqHome from "./views/Home/Home";
import SqAbout from "./views/About/About";
import SqSignup from "./views/Signup/Signup";
import SqLogin from "./views/Login/Login";
import SqFooter from "./views/Layout/Footer/Footer";

function App() {

    return (
        <div className="page-frame">
			<SqHeader/>

			<Switch>
				<Route path={'/'} exact>
					<SqHome/>
				</Route>
				<Route path={'/about'}>
					<SqAbout/>
				</Route>
				<Route path={'/signup'}>
					<SqSignup/>
				</Route>
				<Route path={'/login'}>
					<SqLogin/>
				</Route>
				<PrivateRoute path={'/dashboard'}>
					<p>dashboard here</p>
				</PrivateRoute>
			</Switch>

			<SqFooter/>
        </div>
    );
}

export default App;
