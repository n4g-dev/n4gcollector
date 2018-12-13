import Base from './Base';

export default class Users extends Base {
	get resourceName() {
		return 'users';
	}

	get columns() {
		return ['id', 'firstName', 'lastName', 'otherNames', 'email', 'phone', 'password', 'countryId', 'roles', 'status', 'confirmed', 'createdAt', 'updatedAt'];
	}

	get createColumns() {
		return ['firstName', 'lastName', 'otherNames', 'email', 'phone', 'password', 'countryId', 'roles', 'status', 'confirmed'];
	}
}
