import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import textStyling from '../objects/textstyling';

export class TextStyler extends Component {
  render() {
    const { editorState, updateState } = this.props;

    const applyStyle = (style) => {
      updateState(RichUtils.toggleInlineStyle(editorState, style));
    };
    return (
      <div>
        <ul className="editor__toolbar--text">
          {textStyling.map(style => (
            <li
              key={style.id}
              onClick={ ()=> applyStyle(style.style)}
            >
              <i className={style.icon} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TextStyler;
