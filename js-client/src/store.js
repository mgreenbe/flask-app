import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import getStuff from './actions';

const reducer = (state = 0, action) => {
  console.log(JSON.stringify(action))
  return state
}

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, enhancer);

store.dispatch(getStuff);

export default store;
