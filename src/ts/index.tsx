import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'

import AppStore from './Store'
import { AppStoreState } from './StoreTypes'

import App from './App'
import { NotFound } from './components/NotFound'

ReactDom.render(
	<Provider store={AppStore} >
		<Router>
			<Switch>
				<Route exact path="/" component={App} />
				<Route component={NotFound}/>
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("appContainer")
);
