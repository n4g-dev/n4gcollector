import Base from './Base';

export default class Countries extends Base {
	get resourceName() {
		return 'countries';
	}

	get columns() {
		return ['id', 'name', 'code', 'createdAt', 'updatedAt', 'currencyId' ];
	}

	get createColumns() {
		return ['name', 'code', 'currencyId' ];
	}
}
