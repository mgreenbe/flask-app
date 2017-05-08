import React from 'react';
import Button from './connected-button';
import Input from './connected-input';

const reactComponents = {Button, Input};

const reactify = (node, _mount) => {
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
        let parsedValue = JSON.parse(value); // Is this safe?
        console.log(`${name}: ${parsedValue}, ${typeof parsedValue}`)
        props[name] = parsedValue;
      }
    }
    const children = [];
    const childNodesCount = node.childNodes && node.childNodes.length;
    if (childNodesCount) {
      for (let i = 0; i < childNodesCount; i++) {
        children.push(reactify(node.childNodes[i], _mount));
      }
    }
    return React.createElement(type, props, ...children);
  }
}

export default reactify;
