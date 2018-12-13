import Base from './Base';
import db from './db';

export default class Suppliers extends Base {

	async index(queryParams = { code: 'GH' }, limit = 1000, offset = 0) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('select suppliers.id, firstName, lastName, gender, birthDate, phoneNumber, ' +
					'suppliers.about, membershipCode, gender, o.name as organization, d.name as district,' +
					'c.name as community from suppliers ' +
					'inner join organizations o on suppliers.organizationId = o.id ' +
					'inner join communities c on suppliers.communityId = c.id ' +
					'inner join districts d on c.districtId = d.id', [], (tx, results) => {
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
		return 'suppliers';
	}

	get columns() {
		return ['id', 'firstName', 'lastName', 'about', 'gender', 'phoneNumber', 'organizationId', 'communityId', 'membershipCode', 'productId', 'createdAt', 'updatedAt', 'birthDate'];
	}

	get createColumns() {
		return ['firstName', 'lastName', 'about', 'gender', 'phoneNumber', 'organizationId', 'communityId', 'membershipCode', 'productId', 'birthDate'];
	}
}
