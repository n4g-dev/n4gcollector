import Base from './Base';

export default class Districts extends Base {
	get resourceName() {
		return 'districts';
	}

	get columns() {
		return ['id', 'name', 'regionId', 'createdAt', 'updatedAt' ];
	}

	get createColumns() {
		return ['name', 'regionId'];
	}
}