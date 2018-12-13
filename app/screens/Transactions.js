import React, { PureComponent } from 'react';
import { Accordion, Content, Container } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { index } from '../state/actions';


class Transactions extends PureComponent {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(index('transactions', { supplierId: this.props.navigation.state.params.id }));
	}

	render() {
		const { transactions } = this.props;
		const { id } = this.props.navigation.state.params;
		const userTransactions = transactions.filter(transaction => transaction.supplierId === id)
			.map(transaction => {
				return {
					title: `${transaction.product} - ${moment(transaction.date).format('l')}`,
					content: `
					Status:      ${transaction.status}
					Time:        ${transaction.createdAt} 
					Date:        ${transaction.date}
					Product:     ${transaction.product}
					Yield:       ${transaction.yield}Kg
					Sacs:        ${transaction.sacs || 'Not stated'}
					Payment:     ${transaction.payment}
					Amount paid: ${transaction.amountPaid}
					Total:       ${transaction.currency} ${transaction.cost}
					Collector:   ${transaction.collectorFN} ${transaction.collectorLN}`
				};
			});
		return (
			<Container>
				<Content>
					<Accordion
						dataArray={userTransactions}
						headerStyle={{ backgroundColor: '#A9DAD6' }}
						contentStyle={{ backgroundColor: '#e3f1f1' }}
					/>
				</Content>
			</Container>
		);
	}
}


function mapStateToProps(state) {
	const { suppliers, user, transactions } = state;
	return {
		suppliers,
		transactions,
		user,
	};
}

export default connect(mapStateToProps)(Transactions);
