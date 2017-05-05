import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

const InputWrapper = (props) => {
  return <input value={props.value} onChange={props.onChange} />
}

const getFullPath = (_mount, path) => {
  return (_mount) ? `${_mount}.context.${path}` : `context.${path}`;
}

const mapStateToProps = (state, {_mount, path}) => {
  const fullPath = getFullPath(_mount, path);
  const value = get(state, fullPath) || '';
  return {value}
}

const mapDispatchToProps = (dispatch, {_mount, path}) => {
  const fullPath = getFullPath(_mount, path);
  return {
    onChange: (event) => dispatch({
      type: "CHANGE",
      value: event.target.value,
      fullPath
    })
  }
}

const Input = connect(mapStateToProps, mapDispatchToProps)(InputWrapper)

export default Input;
