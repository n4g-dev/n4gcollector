import Base from './Base';

export default class Products extends Base {

	get resourceName() {
		return 'products';
	}

	get columns() {
		return ['id', 'name', 'about', 'createdAt', 'updatedAt' ];
	}

	get createColumns() {
		return ['name', 'about' ];
	}
}
