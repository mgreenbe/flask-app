// @flow

import React from 'react'
import { Button } from './connected-components'

const App = ({ counter } : { counter: number }) => {
  return (
    <div>
      <label>Answer: <input /></label>
      <Button data-attr="test data attribute">Click</Button>
      <p>Counter: {counter}</p>
    </div>
  )
}

export default App
