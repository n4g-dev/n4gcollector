import Base from './Base';

export default class Regions extends Base {
	get resourceName() {
		return 'regions';
	}

	get columns() {
		return ['id', 'name', 'countryId', 'createdAt', 'updatedAt' ];
	}

	get createColumns() {
		return ['name', 'countryId'];
	}
}