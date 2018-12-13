import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
const enhancers = [];
const middleware = [thunk, loggerMiddleware];
/*
if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.devToolsExtension;

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
} */

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
