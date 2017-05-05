import React from 'react';
// import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { compile } from 'handlebars';
import { DOMParser } from 'xmldom';
import Button from './connected-button';
import Input from './connected-input';

const reactComponents = {Button, Input};

const XComponent = ({node}) => {

  const type = (node.nodeName in reactComponents) ? reactComponents[node.nodeName] : node.nodeName;

  if (type === '#text') {
    return node.nodeValue;
  }
  else {
    const props = {};
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
        children.push(XComponent({node: node.childNodes[i]}));
      }
    }

    return React.createElement(type, props, ...children);
  }
}

const parser = new DOMParser();

const mapStateToProps = ({xml, ...context}) => {
  console.log(xml, context);
  //const {xml, ...context} = state;
  const template = compile(xml);
  const xmlStamped = template(context);
  console.log(xmlStamped);
  const node = parser.parseFromString(xmlStamped).childNodes[0];
  return {node};
}
const XXComponent = connect(mapStateToProps)(XComponent);


export {XComponent, XXComponent};

/*
let e = XComponent({node: doc});
let s = ReactDOMServer.renderToStaticMarkup(e);
console.log(`\n${JSON.stringify(e, null, 2)}\n\n${s}`);

let keys = ['nodeName', 'nodeType', 'localName']

const walkTree = (node, indent='') => {
  console.log(`${indent}Class: ${node.constructor.name}`)
  keys.forEach(
    (key) => {
      console.log(`${indent}${key}: ${node[key]}`);
    }
  );
  let m = node.attributes && node.attributes.length;
  console.log(`${indent}Attributes:`);
  for (i = 0; i < m; i++) {
    console.log(`${indent + '  '}${node.attributes[i].name}=${node.attributes[i].value}`);
  }
  let n = node.childNodes && node.childNodes.length;
  for (let i = 0; i < n; i++) {
    walkTree(node.childNodes[i], indent + '  ');
  }
}

walkTree(doc);

*/



