import React from 'react';
// import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { compile } from 'handlebars';
import { DOMParser } from 'xmldom';
import { get } from 'lodash';
import Button from './connected-button';
import Input from './connected-input';

const reactComponents = {Button, Input};

const Reactify = (node, _mount) => {
  const type = (node.nodeName in reactComponents)
    ? reactComponents[node.nodeName]
    : node.nodeName;

  if (type === '#text') {
    return node.nodeValue;
  }
  else {
    const props = (typeof type === 'string') ? {} : {_mount};
    const attributesCount = node.attributes && node.attributes.length;
    if (attributesCount) {
      for (let i = 0; i < attributesCount; i++) {
        let {name, value} = node.attributes[i];
        props[name] = value;
      }
    }
    const children = [];
    const childNodesCount = node.childNodes && node.childNodes.length;
    if (childNodesCount) {
      for (let i = 0; i < childNodesCount; i++) {
        children.push(Reactify(node.childNodes[i], _mount));
      }
    }
    return React.createElement(type, props, ...children);
  }
}

const parser = new DOMParser();
const xComponent = ({source, context, _mount}) => {
  const XMLString = compile(source)(context);
  const node = parser.parseFromString(XMLString);
  return Reactify(node.childNodes[0], _mount);
}
const mapStateToProps = (state, {_mount}) => {
  const {source, context} = (_mount) ? get(state, _mount) : state;
  return {source, context, _mount}
}
const XComponent = connect(mapStateToProps)(xComponent);

export default XComponent;
