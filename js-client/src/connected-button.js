import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';
import {actionCreators} from './action-creators';

const ButtonWrapper = ({onClick, children, ...otherProps}) => {
  return (<button {...pickHTMLAttributes(otherProps)} onClick={onClick}>{children}</button>);
};

/*const mapStateToProps = (state, {_path}) => {
  const subState = state.filter( (value, key) => key === _path ).toJS();
  return {subState};
};*/

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

const Button = connect(null, mapDispatchToProps)(ButtonWrapper);

export default Button;


