import initialState from './init';

const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case '@@INIT':
      newState = initialState;
      break;
    case 'PUSH':
      newState = state.updateIn(
        action.payload.fullPath,
        list => list.push(action.payload.item)
      );
      break; 
    default:
      console.log('Hit default in the reducer.');
  }
  return newState;
};

export default reducer;
