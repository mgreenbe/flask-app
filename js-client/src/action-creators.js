import fetch from 'isomorphic-fetch';

const fetchInitialState = (url, path) => {
  return (dispatch) => {
    return fetch(url)
    .then(response => response.json())
      .then(items => {
        return dispatch({
        type: 'RECEIVE_ITEMS',
        payload: {path, items}
      })
    });
  }
}

const PUSH = ([path, item], {_path}) => {
  const fullPath = [..._path, 'context', ...path];
  return {
    type: 'PUSH',
    payload: {fullPath, item}
  }
};

const CHANGE = ([path, value], {_path}) => {
  const fullPath = [..._path, 'context', ...path];
  return {
    type: 'CHANGE',
    payload: {fullPath, value}
  }
};

const SUBMIT = (args, {_path}) => {
  return (dispatch, getState) => {
    const {id, context} = getState().getIn(_path).toJS()
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context)
    };
    return fetch('/api?id=' + id, requestData)
      .then(response => response.json())
      .then(obj => {
        dispatch({
          type: 'RECEIVE_SUBMIT_RESPONSE',
          payload: {path: [..._path, 'context'], items: obj}
        });
      });
  }
};

const actionCreators = {
  PUSH,
  CHANGE,
  SUBMIT
};

export {fetchInitialState, actionCreators};
