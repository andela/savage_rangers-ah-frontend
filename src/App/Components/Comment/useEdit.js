import { useState } from 'react';

const useEdit = () => {
  const [isEditable, setState] = useState(false);

  const edit = () => {
    setState(!isEditable);
  };

  return {
    isEditable,
    edit
  };
};

export default useEdit;
