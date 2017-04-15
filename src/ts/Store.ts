import { combineReducers, createStore, ReducersMapObject } from 'redux'

import { AppReducer, initialState } from './reducers/appReducer';

var reducers: ReducersMapObject = {
	AppReducer
}

declare var window: any;

// uncomment the next line to create a redux store with more then one reducer
// important: comment in the last line because there can only be one default export
// important: you need to adjust the initial state in "reducers/appReducer" when you add other reducers
// the adjusted initial state must match the reducers-variable
// export default createStore(combineReducers(reducers), initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);


export default createStore(AppReducer, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);