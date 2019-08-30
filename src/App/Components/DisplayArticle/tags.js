import React from 'react';

const Tags = (props) => {
  const { tags } = props;
  return (
    <div className="ml-2">
      {
        tags.map(item => (
          <div key={item.id} className="article__tags">
            {item.name}
          </div>
        ))
                  }

    </div>
  );
};

export default Tags;
