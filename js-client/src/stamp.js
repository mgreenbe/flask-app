const { compile } = require('handlebars');
const { DOMParser, XMLSerializer } = require('xmldom');
const { get } = require('lodash');

const xml = `<div path="a.b.c">Hi, mom!</div>`

const parser = new DOMParser();
const parsed = parser.parseFromString(xml);
const serializer = new XMLSerializer();
const serialized = serializer.serializeToString(parsed);

console.log(serialized);

const InputWrapper = (props) => {
  return <input value={props.value} onChange={props.onChange} />
}

const wrapper = ({context, node}) {
  const template = compile(serializer.serializeToString(node));
  const stamped = template(context);
  const newNode = parser.parseFromString(node);
  return newNode;
}

const Connect = (nameToPathMap) => {
  const mapStateToProps = (state) => {
    const props = {};
    for (let name in nameToPathMap) {
      let path = nameToPathMap[name];
      props[name] = get(state, path);
    }
    return props;
  }
  const Connector = (Component) => connect(mapStateToProps)(Component);
  return Connector;
}

const HandlebarsTemplateFactory = (node) => {
  const path = node.getAttribute('path');
  node.removeAttribute('path');
  const template = compile(serializer.serializeToString(node));
  const stamped
  const mapStateToProps = (state) => {
    return {
      context: state.get(path)
    }
  }
  return connect(mapStateToProps)(InputWrapper);
  console.log(path);
}

ConnectedComponent(parsed.childNodes[0]);

let obj = {a: {b: [{c: 666}, {d: 777}]}};
console.log(get(obj, "a.b.1.d"));

const Component = (node) => {

  if (node.nodeName === '#text') {
    return node.nodeValue
  }
  else {
    if (node.hasAttribute('path') {
      return ConnectedComponent(node);
    }
    else {
    }

    const attributesCount = node.attributes && node.attributes.length;
    if (attributesCount) {
      for (let i = 0; i < attributesCount; i++) {
        let {name, value} = node.attributes[i];
        props[name] = value;
      }
    }
    
  }
}
