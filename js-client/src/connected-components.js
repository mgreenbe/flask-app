//@flow

import React from 'react'
import { connect } from 'react-redux'

const ButtonWrapper = (props) => {
  return <button {...props}>{props.children}</button>
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch({type: "TEST"})
  }
}

const Button = connect(null, mapDispatchToProps)(ButtonWrapper)

export { Button }
