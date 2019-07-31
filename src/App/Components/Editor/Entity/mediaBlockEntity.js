import React from 'react';

const Image = ({ src }) => {
  if (src) {
    return <img src={src} alt="jpg" />;
  }
  return null;
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    media = <Image src={src} />;
  }

  return media;
};

export default (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    };
  }

  return null;
};
