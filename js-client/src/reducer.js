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
      backgroundColor: 'transparent',
      list: ["foo", "bar", "baz"],
      value: 666,
      answer: ''
    }
  }
});

const reducer = (state=initialState, {type, payload}) => {
  console.log(type, payload);
  let newState
  switch (type) {
    case 'MERGE':
      newState = state.mergeDeep(payload);
      break;
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
