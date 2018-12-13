import db from './db';

export default class Base {
	async index(queryParams = { code: 'GH' }) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(`SELECT ${this.rawDbColumns} from ${this.resourceName}`, [], (tx, results) => {
					if (results) {
						resolve(results.rows.raw());
					} else {
						reject('There was an error');
					}
				});
			});
		});
	}

	async deleteAll() {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(`DELETE from ${this.resourceName}`, (tx, results) => {
					if (results) {
						console.log(results);
						resolve(true);
					} else {
						console.error(`Error deleting ${this.resourceName}`);
						reject('There was an error');
					}
				});
			});
		});
	}

	async createOne(params) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(`INSERT into ${this.resourceName} (${this.createColumns}) values (${this.questionMarks}) ;`, this.values(params), (tx, result) => {
					if (result) {
                        tx.executeSql(`SELECT * from ${this.resourceName} WHERE id = ${result.insertId} limit 1`, [], (tx, results) => {
                            if (results) {
                                resolve(results.rows.raw()[0]);
                            } else {
                                reject('There was an error');
                            }
                        });
					} else {
						reject(`There was an error adding to ${this.resourceName}`);
					}
				});
			});
		});
	}

	async createOneSetup(params) {
		return db.transaction((tx) => {
			return tx.executeSql(`INSERT into ${this.resourceName} (${this.columns}) values (${this.questionMarksSetup}) ;`, this.valuesSetup(params));
		});
	}

	async login(phone, password) {
		const newPhone = '+233' + phone.slice(1);
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(`SELECT * from users WHERE "password" = ${password} limit 1`, [], (tx, results) => {
					if (results) {
						resolve(results.rows.raw()[0]);
					} else {
						reject('There was an error');
					}
				});
			});
		});
	}

	async deleteOne(itemId) {
		return db.transaction((tx) => {
			tx.executeSql(`DELETE from ${this.resourceName} WHERE id = ${itemId}`);
		});
	}

	async updateOne(itemId, params) {
		return db.transaction((tx) => {
			tx.executeSql(`UPDATE ${this.resourceName} WHERE id = ${itemId}`);
		});
	}

	get columns() {
		throw new Error('All children must have db columns');
	}

	get createColumns() {
		throw new Error('All children must have db create columns');
	}

	get rawDbCreateColumns() {
		return this.createColumns.join(',');
	}

	get resourceName() {
		throw new Error('All children must have resourceName');
	}

	get rawDbColumns() {
		return this.columns.join(',');
	}

	get tableDbColumns() {
		const tableColumns = this.columns.map((column) => `${this.resourceName}.${column}`);
		return tableColumns.join(',');
	}

	get questionMarks() {
		let questionMarks = this.createColumns.map(() => '?');
		return questionMarks.join(',');
	}

	get questionMarksSetup() {
		let questionMarks = this.columns.map(() => '?');
		return questionMarks.join(',');
	}

	values(params) {
		const values = [];
		for(let i = 0; i < this.createColumns.length; i++) {
			values.push(params[this.createColumns[i]]);
		}
		return values;
	}

	valuesSetup(params) {
		const values = [];
		for(let i = 0; i < this.columns.length; i++) {
			values.push(params[this.columns[i]]);
		}
		console.log(values);
		return values;
	}
}
