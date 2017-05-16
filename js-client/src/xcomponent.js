import reactify from './reactify';
import Handlebars from './handlebars';
import { connect } from 'react-redux';
import { DOMParser } from 'xmldom';

const parser = new DOMParser();
const xComponent = ({source, context, path}) => {
  const XMLString = (source) ? Handlebars.compile(source)(context) : undefined;
  if (XMLString) {
    const node = parser.parseFromString(XMLString);
    return reactify(node.childNodes[0], path);
  }
  else {
    return null;
  }
}
const mapStateToProps = (state, {path}) => {
  const source = (state.hasIn([...path, 'source']))
    ? state.getIn([...path, 'source'])
    : '';
  const context = (state.hasIn([...path, 'context']))
    ? state.getIn([...path, 'context']).toJS()
    : {};
  return {path, source, context}
}
const XComponent = connect(mapStateToProps)(xComponent);

export default XComponent;
