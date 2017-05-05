import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getStuff } from './actions';
import C from './C';

const xml = `<div className="{{className}}">
<Input />
<Button actionType="INCREMENT">++</Button>
<Button actionType="SET">Set</Button>
<Button actionType="SUBMIT" url="/api" id="my_button">Submit</Button>
<b>Hi</b>, <i>mom!</i>: <input defaultValue="blah" />
<h1>{{counter}}</h1>
</div>`;

// const initialState = {counter: 0, value: '', xml};
const reducer = (state, action) => {
  C.log(state);
  var newState;
  var counter;
  var value;
  switch (action.type) {
    case '@@INIT':
      newState = {counter: 0, value: '', xml};
      break;
    case 'INCREMENT':
      counter = state.counter + 1;
      newState = Object.assign({}, state, {counter});
      break;
    case 'CHANGE':
      value = action.value;
      newState = Object.assign({}, state, {value});
      break;
    case 'SET':
      counter = parseInt(state.value, 10);
      newState = Object.assign({}, state, {counter});
      break;
    default:
      C.log('Hit default in the reducer.');
  }
  C.log(
    (`action: ${JSON.stringify(action)}\n\
    old state: ${JSON.stringify(state)}\n\
    new state: ${JSON.stringify(newState)}`).replace(/^\s+/mg, '')
  );
  return newState;
};

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, enhancer);

store.dispatch(getStuff);

export default store;
