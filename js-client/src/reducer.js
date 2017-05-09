// import initialState from './init';
import Immutable from 'immutable';

const CHANGE = (state, {fullPath, value}) => {
  return state.setIn(fullPath, value);
}

const PUSH = (state, {fullPath, item}) => {
  const newList = state
    .getIn(fullPath)
    .push(item)
  const newState = state
    .setIn(fullPath, newList);
  return newState;
}

const initialState = Immutable.fromJS({
  mnt: {
    source: '',
    context: {
      list: ["foo", "bar", "baz"],
      value: 666
    }
  }
});

const reducer = (state=initialState, {type, payload}) => {
  let newState
  switch (type) {
    case 'SET':
      console.log(type, payload);
      newState = state;
      break;
    case 'PUSH':
      newState = PUSH(state, payload)
      break; 
    case 'CHANGE':
      newState = CHANGE(state, payload);
      break; 
    default:
      newState = state;
  }
  return newState;
};

export default reducer;
