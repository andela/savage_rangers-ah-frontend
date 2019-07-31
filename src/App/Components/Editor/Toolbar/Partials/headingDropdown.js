import React, { Component } from 'react';

class headingDropdown extends Component {
  render() {
    let { active, onToggle, headerOptions } = this.props;
    onToggle = (event) => {
      const { value } = event.target;
      this.props.onToggle(value);
    };

    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <label htmlFor="heading-selector" className="input-group-text">
            <i className="fas fa-heading" />
          </label>
        </div>
        <select
          value={active}
          onChange={onToggle}
          className="custom-select heading"
          id="heading-selector"
        >
          <option value="">Header Levels</option>
          {headerOptions.map((heading, index) => (
            <option value={heading.style} key={index}>
              {heading.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default headingDropdown;
