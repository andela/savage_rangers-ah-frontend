import React, { Component } from 'react';
import HEADER_TYPES from './objects/heading';
import HeadingDropdown from './Partials/headingDropdown';
import ListOrder from './Partials/listOrdering';
import TextSyling from './Partials/textStyler';
import Image from './Partials/imageUpload';
import Alignment from './Partials/alignment';


export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}
class index extends Component {
  render() {
    let {
      editorState, onToggle, updateState, imageUploader
    } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();


    return (
      <div>
        <div className="editor__toolbar">
          <HeadingDropdown
            headerOptions={HEADER_TYPES}
            active={blockType}
            onToggle={onToggle}
          />
          <ListOrder
            active={blockType}
            onToggle={onToggle}
          />
          <TextSyling
            updateState={updateState}
            editorState={editorState}
          />
          <Alignment
            active={blockType}
            onToggle={onToggle}
          />
          <Image
            imageUploader={imageUploader}
          />
        </div>
      </div>
    );
  }
}

export default index;
