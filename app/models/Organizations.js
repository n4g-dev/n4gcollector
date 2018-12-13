import Base from './Base';

export default class Organizations extends Base {
	get resourceName() {
		return 'organizations';
	}

	get columns() {
		return ['id', 'name', 'about', 'createdAt', 'updatedAt'];
	}

	get createColumns() {
		return ['name', 'about'];
	}
}