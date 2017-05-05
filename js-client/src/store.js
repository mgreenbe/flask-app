import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { set } from 'lodash';
import { getStuff } from './actions';
import initialState from './init';
import C from './C';


const reducer = (state, action) => {
  console.log(JSON.stringify(action, null, 4));
  let newState, counter;
  switch (action.type) {
    case '@@INIT':
      newState = initialState;
      break;
    case 'INCREMENT':
      counter = state.counter + 1;
      newState = Object.assign({}, state, {counter});
      break;
    case 'CHANGE':
      newState = set(Object.assign({}, state), action.fullPath, action.value);
      break;
    case 'SET':
      counter = parseInt(state.value, 10);
      newState = Object.assign({}, state, {counter});
      break;
    default:
      C.log('Hit default in the reducer.');
  }
    /*  C.log(
    (`action: ${JSON.stringify(action)}\n\
    old state: ${JSON.stringify(state)}\n\
    new state: ${JSON.stringify(newState)}`).replace(/^\s+/mg, '')
  );*/
  return newState;
};

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, enhancer);

store.dispatch(getStuff);

export default store;
