import React from 'react';
import { connect } from 'react-redux';
import HTMLAttributes from './html-attributes.js';
import {actionCreators} from './action-creators';
import { pick } from 'lodash';
import { Button } from 'react-bootstrap';

const buttonAttributes = [
  'active', 'block', 'bsClass', 'bsSize', 'bsStyle',
  'componentClass', 'disabled', 'href', 'onClick', 'type'
];

const ButtonWrapper = ({onClick, children, ...otherProps}) => {
  const propsToPass = pick(otherProps,
    [...HTMLAttributes, ...buttonAttributes]);
  return (<Button {...propsToPass} onClick={onClick}>{children}</Button>);
};

const mapDispatchToProps = (dispatch, {actions, ...otherProps}) => {
  if (actions) {
    const redux_actions = actions.map(
      ([type, ...args]) => {
        return actionCreators[type](args, otherProps)
      }
    );
    return {
      onClick: () => {
        redux_actions.forEach(action => {
          dispatch(action)
        });
      }
    };
  }
};

const BsButton = connect(null, mapDispatchToProps)(ButtonWrapper);

export default BsButton;


