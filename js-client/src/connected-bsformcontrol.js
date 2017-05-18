import React from 'react';
import {connect} from 'react-redux';
import HTMLAttributes from './html-attributes.js';
import { FormControl } from 'react-bootstrap';
import { pick } from 'lodash';

const formControlAttributes = [
  'bsClass', 'bsSize', 'componentClass', 'id', 'inputRef', 'type'
];

const FormControlWrapper = ({value, onChange, ...otherProps}) => {
  const propsToPass = pick(otherProps,
    [...HTMLAttributes, ...formControlAttributes]);
  return <FormControl value={value} onChange={onChange} {...propsToPass}/>
}

const mapStateToProps = (state, {_path, path}) => {
  const fullPath = [..._path, 'context', ...path];
  const value = state.getIn(fullPath);
  return {value};
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

const BsFormControl = connect(
  mapStateToProps, mapDispatchToProps
)(FormControlWrapper);

export default BsFormControl;
