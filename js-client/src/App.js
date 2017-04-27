import React from 'react'
import { connect } from 'react-redux'
import { Button } from './connected-button'
import { Input } from './connected-input'

const mapStateToProps = (state) => {
  return { state }
}

const app = ({ state }) => {
  return (
    <div>
      <Input />
      <Button name="other name">Increment</Button>
      <p>State: {state}</p>
    </div>
  )
}

const App = connect(mapStateToProps)(app);

export default App
