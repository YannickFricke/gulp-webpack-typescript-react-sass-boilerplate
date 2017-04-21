import { Reducer } from 'redux'
import * as object_assign from 'object-assign'

import { AppStoreState } from '../StoreTypes'
import { ExampleAppAction } from '../actions/AppStoreActions'

export const initialState: AppStoreState = {
	welcomeMessage: "Hello from gulp, TypeScript, React and Sass!"
}

export function AppReducer(state: AppStoreState, action: ExampleAppAction): AppStoreState
{
	if (typeof state == 'undefined')
	{
		return initialState;
	}

	switch (action.type)
	{
		case "SET_WELCOME_MESSAGE":
			var newState: AppStoreState = {
				welcomeMessage: action.welcomeMessage
			}

			return object_assign({}, state, newState);
	}

	return state;
};