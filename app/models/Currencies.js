import Base from './Base';

export default class Currencies extends Base {

	get resourceName() {
		return 'currencies';
	}

	get columns() {
		return ['id', 'name', 'symbol', 'createdAt', 'updatedAt' ];
	}

	get createColumns() {
		return ['name', 'symbol' ];
	}
}
