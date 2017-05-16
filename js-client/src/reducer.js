// import initialState from './init';
import Immutable from 'immutable';

const MERGEIN = (state, {fullPath, obj}) => {
  const newState = state.mergeDeepIn(fullPath, Immutable.fromJS(obj));
  return newState
}

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
} // Change to update?

const reducer = (state=Immutable.Map(), {type, payload}) => {
  //  console.log(`type: ${type},\npayload: ${JSON.stringify(payload, null, 2)}`);
  let newState;
  switch (type) {
    case 'RECEIVE_ITEMS':
      newState = state.mergeIn(payload.path, Immutable.fromJS(payload.items));
      break;
    case 'MERGEIN':
      newState = MERGEIN(state, payload);
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
