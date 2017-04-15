import * as React from 'react';

// important: when you dont need redux bindings for a component you need to pay attention
// that the generics have the type "any" as shown below, otherwise you will get an error
export class NotFound extends React.Component<any, any>
{
	// nothing special here
	// take a look on https://facebook.github.io/react/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
	// for all lifecycle methods
	render()
	{
		return <h1>Not Found</h1>;
	}
}