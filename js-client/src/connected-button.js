import React from 'react';
import { connect } from 'react-redux';
import pickHTMLAttributes from './attributes.js';

const actionCreators = {
  PUSH: ({path, item}, {_mount}) => {
    const fullPath = [_mount, 'context', ...path];
    return {
      type: 'PUSH',
      payload: {fullPath, item}
    }
  },
  CHANGE: ({path, value}, {_mount}) => {
    const fullPath = [_mount, 'context', ...path];
    return {
      type: 'CHANGE',
      payload: {fullPath, value}
    }
  },
  SUBMIT: (args, {_mount}) => {
    console.log(args, _mount);
    return (dispatch, getState) => {
      const context = getState().getIn([_mount, 'context']).toJS()
      const body = JSON.stringify(context);
      return fetch('/api', {method: 'POST', body})
        .then(response => response.json())
        .then(obj => {
          dispatch({
            type: 'MERGEIN',
            payload: {obj, fullPath: [_mount, 'context']}
          });
        });
    }
  },
};





const ButtonWrapper = ({onClick, children, ...otherProps}) => {
  return (<button {...pickHTMLAttributes(otherProps)} onClick={onClick}>{children}</button>);
};

const mapStateToProps = (state, {_mount}) => {
  const subState = state.filter( (value, key) => key === _mount ).toJS();
  return {subState};
};

const mapDispatchToProps = (dispatch, {actionType, actions, ...otherProps}) => {
  if (actions) {
    console.log(actions);
    const redux_actions = actions.map(
      ([type, args]) => {
        console.log(type);
        console.log(args);
        return actionCreators[type](args, otherProps)
      }
    );
    console.log(redux_actions);
    return {
      onClick: () => {
        redux_actions.forEach(action => {
          console.log(action)
          dispatch(action)
        });
      }
    };
  }
  if (actionType) {
    const actionCreator = actionCreators[actionType];
    const action = actionCreator(otherProps);
    return {
      onClick: () => {
        dispatch(action)
      }
    };
  }

};

/*const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = {...ownProps, ...dispatchProps, ...stateProps};
  return props;
}
*/

const Button = connect(mapStateToProps, mapDispatchToProps)(ButtonWrapper);

export default Button;


