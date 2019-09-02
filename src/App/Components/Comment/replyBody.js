import { useState } from 'react';

const replyBodyHolder = () => {
  const [content, setContent] = useState('');

  const changeContentValue = (body) => {
    setContent(body);
  };

  return {
    content,
    changeContentValue
  };
};

export default replyBodyHolder;
