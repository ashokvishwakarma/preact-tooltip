import { h, Component } from 'preact';
import classy from 'classnames';

import './style.scss';

export default class Tooltip extends Component{

  state = {
    active: false
  }

  componentDidMount(){
    const node = this.base;
    const parent = node.parentNode;
    if(parent) {
      parent.addEventListener('mouseover', () => {
        const pos = parent.getBoundingClientRect();
        node.style.top = `${pos.top + pos.height}px`;
        node.style.left = `${pos.left + parseInt((pos.width / 2) - (node.offsetWidth / 2))}px`;
        if (!this.state.active) this.setState({ active: true});
      });

      parent.addEventListener('mouseout', () => {
        if (this.state.active) this.setState({ active: false});
      })
    }
  }

  render(){
    const cls = {tooltip: true, active: this.state.active};
    if(this.props.className) {
      cls[this.props.className] = true;
    }
    return (
      <div className={classy(cls)}>
        <div className="in">{this.props.label}</div>
      </div>
    )
  }
}