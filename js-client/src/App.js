// @flow

import React from 'react';

const App = ({ counter } : { counter: number }) => {
  return (
    <div>
      <label>Answer: <input /></label>
      <button>Click</button>
      <p>Counter: {counter}</p>
    </div>
  )
};

export default App;
