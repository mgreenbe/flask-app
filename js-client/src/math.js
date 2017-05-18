import katex from 'katex';
import 'katex/dist/katex.min.css';
import React from 'react';

/*class TeX extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.children)
    this.renderInto = this.renderInto.bind(this);
  }
  renderInto(elt) {
    console.log(elt);
    elt.innerHTML = katex.renderToString(this.props.children)
  }
  componentDidMount() {
    console.log(this.span);
    katex.render(this.props.children, this.span);
  }
  render() {
    return <span id="container" ref={(span) => {this.span = span}}></span>
  }
}*/

const TeX = ({children, displayMode, ...otherProps}) => {
  return <span
    ref={span => {katex.render(children, span, {displayMode})}}></span>
}

export default TeX;


