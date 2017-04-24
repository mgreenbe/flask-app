import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import getStuff from './actions';

const reducer = (state = 0, action) => state;
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, enhancer);

store.dispatch(getStuff);

export default store;
