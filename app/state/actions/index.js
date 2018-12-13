import * as actionTypes from './ationTypes';
import * as models from '../../models/';
import { modelsInOrder } from '../../models/';
import pluralize from 'pluralize';
import api from '../../api/';
import { Toast } from 'native-base';

const singular = pluralize.singular;

const index = (entity, queryParams) => {
	return async dispatch => {
		try {
			const model = models[entity];
			if (entity === 'suppliers') {
                Toast.show({
                    text: `Loading ${entity} ...`,
                    type: 'success',
                    buttonText: 'Ok'
                });
			}
			const results = await new model().index(queryParams).then((res) => res);
			if (results) {
				dispatch({
					type: actionTypes[`INDEX_${entity.toUpperCase()}_SUCCESS`],
					results,
					entity
				});
				if (entity === 'users' && results.length === 0) {
					dispatch(fetchUsers());
				}
			} else {
				dispatch({
					type: actionTypes[`INDEX_${entity.toUpperCase()}_FAIL`],
					entity
				});
			}
		} catch (err) {
            Toast.show({
                text: `Failed to load ${entity}`,
                type: 'danger',
                buttonText: 'Ok'
            });
		}
	};
};

const setActiveUser = (userDetails) => {
	return async dispatch => {
		try {
			dispatch({
				type: 'SET_ACTIVE_USER',
				result: userDetails,
				entity: 'users',
			});
		} catch (err) {
			dispatch({
				type: 'CREATE_ONE_USERS_FAIL',
				entity: 'users',
			});
		}
	};
}

const createOne = (entity, params) => {
	return async dispatch => {
		try {
			const model = models[entity];
			const result = await new model().createOne(params);
			if (result) {
				dispatch({
					type: actionTypes[`CREATE_ONE_${singular(entity).toUpperCase()}_SUCCESS`],
					result,
					entity
				});
                Toast.show({
                    text: `Successfully created ${singular(entity)}`,
                    type: 'success',
                    buttonText: 'Ok'
                });
			} else {
				dispatch({
					type: actionTypes[`CREATE_ONE_${singular(entity).toUpperCase()}_FAIL`],
					entity
				});
                Toast.show({
                    text: `Failed to create ${singular(entity)}`,
                    type: 'success',
                    buttonText: 'Ok'
                });
			}
		} catch (err) {
            Toast.show({
                text: `Failed ot ${singular(entity)}`,
                type: 'danger',
                buttonText: 'Ok'
            });
		}
	};
};

const deleteOne = (entity, itemId) => {
	return async dispatch => {
		try {
			const model = models[entity];
			const result = await new model().deleteOne(itemId);
			if (result) {
				dispatch({
					type: actionTypes[`DELETE_ONE_${singular(entity).toUpperCase()}_SUCCESS`],
					result,
					entity
				});
			} else {
				dispatch({
					type: actionTypes[`DELETE_ONE_${singular(entity).toUpperCase()}_FAIL`],
					entity
				});
			}
		} catch (err) {
            Toast.show({
                text: `Failed to delete ${singular(entity)}`,
                type: 'danger',
                buttonText: 'Ok'
            });
		}
	};
};

const updateOne = (entity, params, itemId) => {
	return async dispatch => {
		try {
			const model = models[entity];
			const result = await new model().updateOne(itemId, params);
			if (result) {
				dispatch({
					type: actionTypes[`UPDATE_ONE${singular(entity).toUpperCase()}_SUCCESS`],
					result,
					entity
				});
                Toast.show({
                    text: `Successfully updated ${singular(entity)}`,
                    type: 'success',
                    buttonText: 'Ok'
                });
			} else {
				dispatch({
					type: actionTypes[`UPDATE_ONE${singular(entity).toUpperCase()}_FAIL`]
				});
			}
		} catch (err) {
            Toast.show({
                text: `Failed to update ${singular(entity)}`,
                type: 'danger',
                buttonText: 'Ok'
            });
		}
	};
};

const login = (phone, password) => {
	return async dispatch => {
		try {
			const model = models['users'];
			const result = await new model().login(phone, password).then((res) => res);
			if (result) {
				dispatch({
					type: actionTypes['LOGIN_USER_SUCCESS'],
					result,
					entity: 'user'
				});
			} else {
				dispatch({
					type: actionTypes['LOGIN_USER_FAIL']
				});
                Toast.show({
                    text: 'Failed to login',
                    type: 'danger',
                    buttonText: 'Ok'
                });
			}
		} catch (err) {
            Toast.show({
                text: 'Failed to login',
                type: 'success',
                buttonText: 'Ok'
            });
		}
	};
};

const fetchUsers = () => {
	return async dispatch => {
		try {
			const collectors = await api.service('users').find();
			if (collectors) {
				dispatch({
					type: actionTypes.INDEX_USERS_SUCCESS,
					entity: 'users',
					results: collectors.data
				});
				collectors.data.forEach(async (collector) => {
                    if (collector.email === 'tester@gmail.com') {
                        collector.password = 'testuser';
                    }
					else if (collector.email === 'prince.obeng@agribusinessconsult.org') {
						collector.password = 'princen4g';
					} else if (collector.email === 'cakwenin@gmail.com') {
						collector.password = 'charlesn4g';
					} else {
						collector.password = 'salmut5433';
					}
					await new models['users']().createOneSetup(collector).then((res) => res);
				});
			} else {
                Toast.show({
                    text: 'You need internet',
                    type: 'warning',
                    buttonText: 'Ok'
                });
			}
		} catch (err) {
            Toast.show({
                text: 'Could not load users',
                type: 'danger',
                buttonText: 'Ok'
            });
		}
	};
}

async function clearTables() {
	modelsInOrder.forEach(async(model) => {
		const instance = new model();
		try {
			const deletedTables = await instance.deleteAll();
			if (deletedTables) {
				console.info(`Successs : ${instance.resourceName}`);
			} else {
				console.info(`Fail : ${instance.resourceName}`);
			}
		} catch(err) {
			console.info(`Fail : ${instance.resourceName}`);
		}
	});
}

const downloadSites = (config) => {
	return async dispatch => {
		try {
			await clearTables();
            Toast.show({
                text: 'Loading site',
                type: 'success',
                buttonText: 'Ok'
            });
			const suppliers = await api.service('suppliers').find({ query: { communityId: { $in: config.communityIds }}});
			// const transactions = await api.service('transactions').find({ query: { "supplierId": { $in: supplierIds } }});
			const communities = await api.service('communities').find({ query: { id: { $in: config.communityIds }}});
			const organizations = await api.service('organizations').find({ query: { $limit: 10 }});
			const countries = await api.service('countries').find();
			const currencies = await api.service('currencies').find();
			const regions = await api.service('regions').find({ query: { id: { $in: config.regionIds } }});
			const districts = await api.service('districts').find({ query: { id: { $in: config.districtIds }} });
			const products = await api.service('products').find();

			if (suppliers && communities && organizations && countries && currencies && regions && districts && products /* && transactions*/) {

                Toast.show({
                    text: 'Loading currencies',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await currencies.data.forEach(async (currency) => {
					await new models['currencies']().createOneSetup(currency);
				});

                Toast.show({
                    text: 'Loading countries',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await countries.data.forEach(async (country) => {
					await new models['countries']().createOneSetup(country);
				});

                Toast.show({
                    text: 'Loading regions',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await regions.data.forEach(async (region) => {
					await new models['regions']().createOneSetup(region);
				});

                Toast.show({
                    text: 'Loading districts',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await districts.data.forEach(async (district) => {
					await new models['districts']().createOneSetup(district);
				});

                Toast.show({
                    text: 'Loading communities',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await communities.data.forEach(async (community) => {
					await new models['communities']().createOneSetup(community);
				});

                Toast.show({
                    text: 'Loading organizations',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await organizations.data.forEach(async (organization) => {
					await new models['organizations']().createOneSetup(organization);
				});

                Toast.show({
                    text: 'Loading products',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await products.data.forEach(async (product) => {
					await new models['products']().createOneSetup(product);
				});

                Toast.show({
                    text: 'Loading suppliers',
                    type: 'success',
                    buttonText: 'Ok'
                });
				await suppliers.data.forEach(async (supplier) => {
					await new models['suppliers']().createOneSetup(supplier);
				});

                Toast.show({
                    text: 'Loading transactions',
                    type: 'success',
                    buttonText: 'Ok'
                });

                /*
				await transactions.data.forEach(async (transaction) => {
					await new models['transactions']().createOneSetup(transaction);
				}); */
                Toast.show({
                    text: 'Done loading sites',
                    type: 'success',
                    buttonText: 'Ok'
                });

			} else {
				dispatch({
					type: actionTypes['DOWNLOAD_SITES_FAIL']
				});
                Toast.show({
                    text: 'Failed to load sites',
                    type: 'danger',
                    buttonText: 'Ok'
                });
			}
		} catch (err) {
			console.log(err);
            Toast.show({
                text: 'Error loading sites',
                type: 'danger',
                buttonText: 'Ok'
            });
		}
	};
}

module.exports = {
	index,
	createOne,
	updateOne,
	deleteOne,
	login,
	downloadSites,
	fetchUsers,
	setActiveUser,
};
