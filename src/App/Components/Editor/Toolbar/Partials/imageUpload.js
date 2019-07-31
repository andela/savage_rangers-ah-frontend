import React from 'react';


export default function imageUploadf({ imageUploader }) {
  return (
    <div>
      <ul className="editor__toolbar--img">
        <li>
          <input type="file" name="file" id="file" className="file-uploader" onChange={imageUploader} />
          <label htmlFor="file">
            <i className="far fa-image" />
          </label>
        </li>
      </ul>
    </div>
  );
}
