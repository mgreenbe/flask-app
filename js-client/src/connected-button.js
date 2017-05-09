import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';
// import { get } from 'lodash';
// import { actionCreator } from './actions';

const actionCreators = {
  PUSH: ({path, item, _mount}) => {
    const fullPath = [_mount, 'context', ...path];
    return {
      type: 'PUSH',
      payload: {fullPath, item}
    }
  },
  SUBMIT: () => null,
  SET: () => null,
};

const ButtonWrapper = ({onClick, children, ...otherProps}) => {
  return (<button {...pickHTMLAttributes(otherProps)} onClick={onClick}>{children}</button>);
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


