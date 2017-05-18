import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

/*ReactDOM.render(
  <TeX displayMode>\int_a^bf(x)dx = f(b)-f(a)</TeX>,
  document.getElementById('root')
);*/
