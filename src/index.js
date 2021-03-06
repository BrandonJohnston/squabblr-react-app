import React from 'react';
import ReactDOM from 'react-dom';

import { ProvideAuth } from './utils/Auth/AuthUtils';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store/store';
import { Provider } from 'react-redux';

import 'normalize.css';
import './static/sass/index.scss';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
		<Provider store={store}>
			<ProvideAuth>
				<Router>
					<App />
				</Router>
			</ProvideAuth>
		</Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your store to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
