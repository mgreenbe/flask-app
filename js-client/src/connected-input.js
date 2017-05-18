import React from 'react';
import {connect} from 'react-redux';
import pickHTMLAttributes from './attributes.js';

const InputWrapper = ({value, onChange, ...otherProps}) => {
  return <input value={value} onChange={onChange} {...pickHTMLAttributes(otherProps)}/>
}

const mapStateToProps = (state, {_path, path, type, value}) => {
  const fullPath = [..._path, 'context', ...path];
  let checked;
  if (type === 'radio') {
    checked = (state.getIn(fullPath) === value);
    return {checked};
  }
  else if (type === 'checkbox') {
    checked = state.getIn(fullPath);
    return {checked}
  }
  else {
    const value = state.getIn(fullPath);
    return {value};
  }
}

const mapDispatchToProps = (dispatch, {type, _path, path}) => {
  const fullPath = [..._path, 'context', ...path];
  if (type === 'checkbox') 
    return {
      onChange: () => dispatch({
        type: 'TOGGLE',
        payload: {fullPath}
      })
    }
  else {
    return {
      onChange: (event) => dispatch({
        type: 'CHANGE',
        payload: {fullPath, value: event.target.value}
      })
    }
  }
}

const Input = connect(mapStateToProps, mapDispatchToProps)(InputWrapper)

export default Input;
