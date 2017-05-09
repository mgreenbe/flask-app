// import ReactDOMServer from 'react-dom/server';
import reactify from './reactify';
import Handlebars from './handlebars';
import { connect } from 'react-redux';
import { DOMParser } from 'xmldom';

const parser = new DOMParser();
const xComponent = ({source, context, _mount}) => {
  const XMLString = Handlebars.compile(source)(context);
  const node = parser.parseFromString(XMLString);
  return reactify(node.childNodes[0], _mount);
}
const mapStateToProps = (state, {_mount}) => {
  const source = state.getIn([_mount, 'source']);
  const context = state.getIn([_mount, 'context']).toJS();
  return {source, context, _mount}
}
const XComponent = connect(mapStateToProps)(xComponent);

export default XComponent;
