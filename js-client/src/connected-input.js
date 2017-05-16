import React from 'react';
import {connect} from 'react-redux';
import pickHTMLAttributes from './attributes.js';

const InputWrapper = ({value, onChange, ...otherProps}) => {
  return <input value={value} onChange={onChange} {...pickHTMLAttributes(otherProps)}/>
}

const mapStateToProps = (state, {_path, path, type, value}) => {
const fullPath = [..._path, 'context', ...path];
  if (type === 'radio') {
    const checked = (state.getIn(fullPath) === value)
    return {checked}
  }
  else {
  const value = state.getIn(fullPath);
    return {value}
  }
}

const mapDispatchToProps = (dispatch, {_path, path}) => {
  const fullPath = [..._path, 'context', ...path];
  return {
    onChange: (event) => dispatch({
      type: 'CHANGE',
      payload: {fullPath, value: event.target.value}
    })
  }
}

const Input = connect(mapStateToProps, mapDispatchToProps)(InputWrapper)

export default Input;
