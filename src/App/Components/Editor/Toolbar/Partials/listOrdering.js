import React, { Component } from 'react';
import ORDERING from '../objects/ordering';

export class listOrdering extends Component {
  render() {
    let { onToggle } = this.props;
    onToggle = (value) => {
      this.props.onToggle(value);
    };
    return (
      <div>
        <ul className="editor__toolbar--ordering">
          {ORDERING.map((order, index) => (
            <li key={index} onClick={e => onToggle(order.style)}>
              <i className={order.icon} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default listOrdering;
