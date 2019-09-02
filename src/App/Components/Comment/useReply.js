import { useState } from 'react';

const useReply = () => {
  const [isHidden, changeState] = useState(false);


  const toggle = () => {
    changeState(!isHidden);
  };

  return {
    isHidden,
    toggle
  };
};

export default useReply;
