import React from 'react';
import Button from './connected-button';
import Input from './connected-input';
import TeX from './tex';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import { Button as BsButton,
  //  FormControl as BsFormControl } from 'react-bootstrap';
import BsButton from './connected-bsbutton';
import BsFormControl from './connected-bsformcontrol';



const reactComponents = {Button, Input, TeX, BsButton, BsFormControl};

const reactify = (node, _path) => {
  console.log(node.nodeName, typeof node.nodeName);
  const type = (node.nodeName in reactComponents)
    ? reactComponents[node.nodeName]
    : node.nodeName;

  if (type === '#text') {
    return node.nodeValue;
  }
  else {
    const props = (typeof type === 'string') ? {} : {_path};
    const attributesCount = node.attributes && node.attributes.length;
    if (attributesCount) {
      for (let i = 0; i < attributesCount; i++) {
        let {name, value} = node.attributes[i];
        let parsedValue = JSON.parse(value); // Is this safe?
        //        console.log(`${name}: ${parsedValue}, ${typeof parsedValue}`)
        props[name] = parsedValue;
      }
    }
    const children = [];
    const childNodesCount = node.childNodes && node.childNodes.length;
    if (childNodesCount) {
      for (let i = 0; i < childNodesCount; i++) {
        children.push(reactify(node.childNodes[i], _path));
      }
    }
    return React.createElement(type, props, ...children);
  }
}

export default reactify;
