import Base from './Base';

export default class Communities extends Base {
	get resourceName() {
		return 'communities';
	}

	get columns() {
		return ['id', 'name', 'districtId', 'createdAt', 'updatedAt' ];
	}

	get createColumns() {
		return ['name', 'districtId'];
	}
}