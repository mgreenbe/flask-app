import fetch from 'isomorphic-fetch';
import C from './C';

const thunkCreator = (url, id) => {
  return (dispatch) => {
    return fetch(url)
      .then(response => response.text())
      .then(text => C.log(text));
  };
};

const actionCreator = ({actionType, url, id}) => {
  if (actionType === 'SUBMIT') {
    C.log(id);
    return thunkCreator(url);
  } else {
    return {type: actionType};
  }
};

const getStuff = () => {
  return fetch('/api')
    .then(response => response.text())
    .then(text => C.log(text));
};

const fetchInitialState = (dispatch) => {
  return fetch('/api')
  .then(response => response.text())
  .then(value =>
    dispatch({
      type: 'CHANGE',
      payload: {
        fullPath: ['mnt', 'source'],
        value
      }
    })
  );
}


/*const double = (dispatch, getState) => {
  const state = getState();
  return fetch('/api', {
    method: 'post',
    body: state
  })
    .then(response => response.text())
    .then(text => C.log(text));
};*/

export {getStuff, fetchInitialState, actionCreator, thunkCreator};
