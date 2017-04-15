import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'

import AppStore from './Store'
import { SetNewMessage } from './actions/AppStoreActions'
import { AppStoreState } from './StoreTypes'

interface AppStateProperties
{
	message: string;
}

interface AppDispatchProperties
{
	onInputChange: Function;
}

// notice: with "AppStateProperties & AppDispatchProperties" we merge the properties to get access and autocomplete to both objects
export class App extends React.Component<AppStateProperties & AppDispatchProperties, any>
{
	render()
	{
		return <div id="app">{this.props.message}
			<input type="text" value={this.props.message} onChange={(e) => this.props.onInputChange(e)} />
		</div>;
	}
}

// we need to map the !!root!! store state to the component properties
const mapStateToProps = (state: AppStoreState, ownProp?: any): AppStateProperties  => ({
    message: state.welcomeMessage
});

// here we define all actions that are exposed to the component through the component properties
const mapDispatchToProps = (dispatch: any): AppDispatchProperties => ({
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    	dispatch(SetNewMessage(event.target.value))
    }
});

// finally we need to export our redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(App);