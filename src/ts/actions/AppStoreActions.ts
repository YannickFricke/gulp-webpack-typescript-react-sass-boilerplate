import { Action } from 'redux'

export interface ExampleAppAction extends Action
{
	welcomeMessage?: string;
	// you can define more properties here
	// append a question mark to make the property optional
	// you can still use the other properties in other actions
}

export const SetNewMessage = function(welcomeMessage: string): ExampleAppAction
{
	// we simply return an object for the reducer
	// if you need more properties in the reducer, define them in the interface
	return {
		type: "SET_WELCOME_MESSAGE",
		welcomeMessage: welcomeMessage
	};
}