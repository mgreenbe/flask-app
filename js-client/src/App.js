import React from 'react';
import { connect } from 'react-redux';
import {XComponent, XXComponent} from './xml';
import { compile } from 'handlebars';
import { DOMParser } from 'xmldom';



let xml = `<div className="{{className}}">
<Input />
<Button actionType="INCREMENT">++</Button>
<Button actionType="SET">Set</Button>
<Button actionType="SUBMIT" url="/api" id="my_button">Submit</Button>
<b>Hi</b>, <i>mom!</i>: <input defaultValue="blah" />
</div>`;

xml = compile(xml)({className: 'injected'});

const parser = new DOMParser();
const node = parser.parseFromString(xml).childNodes[0];

const app = ({state}) => {
  return (
    <div>
      <p>State: {state.counter}</p>
      <XComponent node={node} />
      <XXComponent />
    </div>
  )
}
const mapStateToProps = (state) => {
  return { state }
}
const App = connect(mapStateToProps)(app);

export default App
