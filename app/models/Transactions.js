import Base from './Base';
import db from './db';

export default class Transactions extends Base {

	async index(queryParams = {}, limit = 1000, offset = 0) {
		console.log(queryParams);
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('select transactions.id, transactions.sacs, transactions.createdAt, transactions.yield, transactions.date, ' +
					'transactions.cost, transactions.payment, transactions.supplierId, transactions.status, ' +
					'transactions.amountPaid, u.firstName as collectorFN, u.lastName as collectorLN, ' +
					'p.name as product, c.name as currency, s.firstName as supplierFN, s.lastName as supplierLN from ' +
					'transactions inner join users u on transactions.collectorId = u.id ' +
					'inner join suppliers s on transactions.supplierId = s.id ' +
					'inner join currencies c on transactions.currencyId = c.id ' +
					'inner join products p on transactions.productId = p.id ' +
					`where transactions.supplierId = ${queryParams.supplierId}`, [], (tx, results) => {
					if (results) {
						resolve(results.rows.raw());
					} else {
						reject('There was an error');
					}
				});
			});
		});
	}

	get resourceName() {
		return 'transactions';
	}

	get columns() {
		return ['id', 'date', 'payment', 'cost', 'amountPaid', 'productId',
			'supplierId', 'collectorId', 'currencyId', 'yield', 'sacs', 'status', 'createdAt', 'updatedAt' ];
	}

	get createColumns() {
		return ['date', 'payment', 'cost', 'amountPaid', 'productId',
			'supplierId', 'collectorId', 'currencyId', 'yield', 'sacs', 'status' ];
	}
}
