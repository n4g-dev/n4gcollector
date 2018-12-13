import initialState from './initialState';
import * as types from '../actions/ationTypes';
import * as commonTypes from '../actions/common/actionTypes';
import pluralize from 'pluralize';

const reducer = (state = initialState, action) => {
	const entity = action.entity;
	if (action.type.indexOf('@@') !== -1) {
		return state;
	}
	switch (action.type) {
	case types['LOGIN_USER_SUCCESS']: {
		const newState = Object.assign({}, state);
		newState['user'] = action.result;
		return newState;
	}
	case types[`INDEX_${entity.toUpperCase()}_SUCCESS`]: {
		const newState = Object.assign({}, state);
		newState[entity] = action.results;
		return newState;
	}
	case types[
		`CREATE_ONE_${pluralize.singular(entity).toUpperCase()}_SUCCESS`
	]: {
		const newState = Object.assign({}, state);
		newState[entity].push(action.result);
		return newState;
	}
	case commonTypes.ALERT_SUCCESS: {
		const newState = Object.assign({}, state);
		newState.alert = action.message;
		return newState;
	}
	case 'SET_ACTIVE_USER': {
		const newState = Object.assign({}, state);
		newState['user'] = action.result;
		return newState;
	}
	default:
		return state;
	}
};

export default reducer;
