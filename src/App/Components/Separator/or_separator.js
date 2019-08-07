import React from 'react';

const Separator = (props) => {
  const { name } = props;
  return (
    <div className="or-separator">
      <b>{name}</b>
    </div>
  );
};

export default Separator;
