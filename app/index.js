import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRoot } from './config/router';
import store from './state/store';
import { Root } from 'native-base';

class App extends Component {
	render() {
		return (

			<Root>
				<Provider store={store}>
					<AppRoot />
				</Provider>
			</Root>
		);
	}
}

export default App;
