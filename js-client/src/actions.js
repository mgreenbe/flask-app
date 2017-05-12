import Immutable from 'immutable'
import fetch from 'isomorphic-fetch';

const fetchInitialState = (dispatch) => {
  return fetch('/api')
  .then(response => response.json())
    .then(value => {
    return dispatch({
      type: 'CHANGE',
      payload: {
        fullPath: ['mnt'],
        value: Immutable.fromJS(value)
      }
    })
  }
  );
}
export {fetchInitialState};
