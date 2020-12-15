import React, { createContext, useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";

const sqAuth = {
	isAuthenticated: false,
	signin(cb) {
		sqAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		sqAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();
	return (
		<authContext.Provider value={ auth }>
			{ children }
		</authContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(authContext);
}

const authContext = createContext();

function useProvideAuth() {
	const [user, setUser] = useState(null);

	const signin = cb => {
		return sqAuth.signin(() => {
			setUser("user");
			cb();
		});
	};

	const signout = cb => {
		return sqAuth.signout(() => {
			setUser(null);
			cb();
		});
	};

	return {
		user,
		signin,
		signout
	};
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute = ({ children, ...rest }) => {
	let auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}
