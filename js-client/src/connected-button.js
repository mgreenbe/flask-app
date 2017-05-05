import React from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './actions';
import C from './C';

const ButtonWrapper = (props) => {
  return (<button onClick={props.onClick}>{props.children}</button>);
};
/*ButtonWrapper.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
  actionType: PropTypes.func.isRequired
};*/

const mapDispatchToProps = (dispatch, ownProps) => {
  C.log(JSON.stringify(ownProps));
  return {
    onClick: () => dispatch(actionCreator(ownProps))
  };
};

const Button = connect(null, mapDispatchToProps)(ButtonWrapper);

export default Button;
