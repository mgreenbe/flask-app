import fetch from 'isomorphic-fetch';

const getStuff = () => {
  return fetch('/api')
    .then(response => response.text())
    .then(text => console.log(text))
}

const double = (dispatch, getState) => {
  const state = getState();
  return fetch('/api', {
    method: 'post',
    body: state
  })
    .then(response => response.text())
    .then(text => console.log(text))
}

export default getStuff;
