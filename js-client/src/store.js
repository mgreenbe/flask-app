import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getStuff } from './actions';
import reducer from './reducer';

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, enhancer);

store.dispatch(getStuff);

export default store;

/*const reducer = (state, action) => {
  console.log(JSON.stringify(action, null, 4));
  let newState, counter, arr;
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
    case 'PUSH':
      console.log(action);
      arr = [...get(state, action.payload.fullPath)];
      arr.push(action.payload.item)
      newState = set(
        Object.assign({}, state),
        action.payload.fullPath,
        arr
      );
      console.log(JSON.stringify(newState, null, 4), state === newState);
      break; 
    default:
      C.log('Hit default in the reducer.');
  }
  return newState;
};*/


