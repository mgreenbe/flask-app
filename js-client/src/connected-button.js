import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';
// import { get } from 'lodash';
// import { actionCreator } from './actions';

const getFullPath = (_mount, path) => {
  return [_mount, 'context', ...path.split('.')];
}

const actionCreators = {
  PUSH: ({path, item, _mount}) => {
    const fullPath = getFullPath(_mount, path);
    return {
      type: 'PUSH',
      payload: {fullPath, item}
    }
  },
  SUBMIT: () => null,
  SET: () => null,
};

const ButtonWrapper = ({onClick, children, ...rest}) => {
  return (<button {...pickHTMLAttributes(rest)} onClick={onClick}>{children}</button>);
};

const mapDispatchToProps = (dispatch, {actionType, ...otherProps}) => {
  const actionCreator = actionCreators[actionType];
  const action = actionCreator(otherProps);
  return {
    onClick: () => dispatch(action)
  };
};

const Button = connect(null, mapDispatchToProps)(ButtonWrapper);

export default Button;


