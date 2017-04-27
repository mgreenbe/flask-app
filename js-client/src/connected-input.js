import React from 'react'
import { connect } from 'react-redux'

const InputWrapper = (props) => {
  return <input {...props} />
}

const mapStateToProps = (state) => {
  return {
    value: state
  }
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

export { Input }
