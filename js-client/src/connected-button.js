import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';
import { actionCreator } from './actions';

const ButtonWrapper = ({onClick, children, ...rest}) => {
  return (<button {...pickHTMLAttributes(rest)} onClick={onClick}>{children}</button>);
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(actionCreator(ownProps))
  };
};

const Button = connect(null, mapDispatchToProps)(ButtonWrapper);

export default Button;
