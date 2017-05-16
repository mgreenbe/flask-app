import fetch from 'isomorphic-fetch';

const fetchInitialState = (url) => {
  return (dispatch) => {
    return fetch(url)
    .then(response => response.json())
      .then(items => {
        return dispatch({
        type: 'RECEIVE_ITEMS',
        payload: {
          path: [],
          items
        }
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
    const context = getState().getIn([..._path, 'context']).toJS()
    const body = JSON.stringify(context);
    return fetch('/api', {method: 'POST', body})
      .then(response => response.json())
      .then(obj => {
        dispatch({
          type: 'MERGEIN',
          payload: {obj, fullPath: [_path, 'context']}
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
