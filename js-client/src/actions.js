import fetch from 'isomorphic-fetch';

const getStuff = () => {
  return fetch('/api')
    .then(response => response.text())
    .then(text => console.log(text))
}

export default getStuff;
