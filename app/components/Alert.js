import Dialog from 'react-native-dialog';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { alert } from '../state/actions/common';
import * as commonTypes from '../state/actions/common/actionTypes';

class Alert extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dialogVisible: false
		};

		this.hideDialog = this.hideDialog.bind(this);
	}


	hideDialog() {
		const { dispatch } = this.props;
		dispatch(alert(commonTypes.ALERT_SUCCESS, '', 'none'));
	}

	render() {
		const { alert } = this.props;

		return (
			<Dialog.Container visible={ !!alert }>
				<Dialog.Title>Alert</Dialog.Title>
				<Dialog.Description>
					{alert}
				</Dialog.Description>
				<Dialog.Button label="Ok" onPress={() => this.hideDialog()} />
			</Dialog.Container>
		);
	}
}



function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert
	};
}

export default connect(mapStateToProps)(Alert);