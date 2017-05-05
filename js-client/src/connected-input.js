import React from 'react'
import { connect } from 'react-redux'

const InputWrapper = (props) => {
  return <input value={props.value} onChange={props.onChange} />
}

const mapStateToProps = (state) => {
  const value = state.value;
  return {value}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (event) => dispatch({
      type: "CHANGE",
      value: event.target.value
    })
  }
}

const Input = connect(mapStateToProps, mapDispatchToProps)(InputWrapper)

export default Input;
