import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchInitialState } from './action-creators';
import reducer from './reducer';
import querystring from 'querystring';

const loggerMiddleware = createLogger();
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware));
const store = createStore(reducer, enhancer);

const ids = {ids: ['test1', 'test2']}
const params = querystring.stringify(ids);
const url = '/api?' + params;

store.dispatch({type: 'CHANGE', payload: {fullPath: ['ids'], value: ids.ids}})
store.dispatch(fetchInitialState(url));

export default store;
