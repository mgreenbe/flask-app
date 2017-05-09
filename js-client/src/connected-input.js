import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';

const InputWrapper = ({value, onChange, ...otherProps}) => {
  return <input value={value} onChange={onChange} {...pickHTMLAttributes(otherProps)}/>
}

const mapStateToProps = (state, {_mount, path}) => {
  const fullPath = [_mount, 'context', ...path];
  const value = state.getIn(fullPath);
  return {value}
}

const mapDispatchToProps = (dispatch, {_mount, path}) => {
  const fullPath = [_mount, 'context', ...path];
  return {
    onChange: (event) => dispatch({
      type: "CHANGE",
      payload: {fullPath, value: event.target.value}
    })
  }
}

const Input = connect(mapStateToProps, mapDispatchToProps)(InputWrapper)

export default Input;
