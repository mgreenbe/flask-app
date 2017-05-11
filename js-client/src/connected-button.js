import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';

const actionCreators = {
  PUSH: ({path, item, _mount}) => {
    const fullPath = [_mount, 'context', ...path];
    return {
      type: 'PUSH',
      payload: {fullPath, item}
    }
  },
  SUBMIT: ({_mount}) => {
    return (dispatch, getState) => {
      const subState = {};
      subState[_mount] = {
        context: getState().getIn([_mount, 'context']).toJS()
      };
        /*      const body = JSON.stringify(
        getState()
        .filter((value, key) => key === _mount)
        .toJS()
      );*/
      const body = JSON.stringify(subState);
      return fetch('/api', {method: 'POST', body})
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: 'MERGE',
            payload: json
          });
          console.log(JSON.stringify(json))
        });
    }
  },
  SET: () => null,
};

const ButtonWrapper = ({onClick, children, ...otherProps}) => {
  return (<button {...pickHTMLAttributes(otherProps)} onClick={onClick}>{children}</button>);
};

const mapStateToProps = (state, {_mount}) => {
  const subState = state.filter( (value, key) => key === _mount ).toJS();
  return {subState};
};

const mapDispatchToProps = (dispatch, {actionType, ...otherProps}) => {
  const actionCreator = actionCreators[actionType];
  const action = actionCreator(otherProps);
  return {
    onClick: () => {
      dispatch(action)
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = {...ownProps, ...dispatchProps, ...stateProps};
  return props;
}

const Button = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ButtonWrapper);

export default Button;


