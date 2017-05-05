import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
// import C from '/.C';

ReactDOM.render(
  <Provider store={store}>
    <App counter={store.getState()}/>
  </Provider>,
  document.getElementById('root')
);

/*(const filterObject = (obj, f) => {
  const g = (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  };
  return Object.entries(obj)
    .filter(f)
    .reduce(g, {});
};*/
