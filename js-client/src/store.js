import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import getStuff from './actions';

const reducer = (state = 0, action) => {
  var newState;
  switch (action.type) {
    case "INCREMENT":
      newState = state + 1;
      break;
    default:
      newState = state + 1;
      break;
  }
  console.log(
    (`action: ${JSON.stringify(action)}\n\
    old state: ${JSON.stringify(state)}\n\
    new state: ${JSON.stringify(newState)}`).replace(/^\s+/mg, '')
  );
  return newState;
}

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, enhancer);

store.dispatch(getStuff);

export default store;
