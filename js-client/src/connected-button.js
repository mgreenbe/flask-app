import React from 'react'
import { connect } from 'react-redux'

const ButtonWrapper = (props) => {
  return <button name="name attribute" {...props}>{props.children}</button>
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(JSON.stringify(ownProps));
  return {
    onClick: () => dispatch({type: "INCREMENT"})
  }
}

const Button = connect(null, mapDispatchToProps)(ButtonWrapper)

export { Button }
