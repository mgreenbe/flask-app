import katex from 'katex';
import 'katex/dist/katex.min.css';
import React from 'react';
import pickHTMLAttributes from './attributes.js';

/*const TeX = ({children, displayMode, ...otherProps}) => {
  return <span
    ref={span => {if (span) {katex.render(children, span, {displayMode})}}}
    {...pickHTMLAttributes(otherProps)}></span>
}*/

class TeX extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tex: props.children};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children && !!(this.elt)) {
      katex.render(nextProps.children, this.elt, {displayMode: nextProps.displayMode});
    }
  }
  componentDidMount() {
    const tex = this.state.tex;
    if (typeof tex === 'string') {
      const elt = this.elt;
      const displayMode = this.props.displayMode;
      console.log(tex, elt, displayMode);
      katex.render(tex, elt, {displayMode});
    }
    else
    {
      console.error(`TeX can only contain text content.`);
    }
  }
  render() {
    const {children, displayMode, ...otherProps} = this.props;
    return <span
        ref={elt => {this.elt = elt}}
        {...pickHTMLAttributes(otherProps)}></span>
  }
}
export default TeX;


