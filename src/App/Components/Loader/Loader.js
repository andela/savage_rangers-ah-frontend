import React, { useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const Loader = () => {
  const state = useState({ loading: true });

  return (
    <div className="container sweet-loading align-items-center justify-content-center">
      <ClimbingBoxLoader sizeUnit="px" size={25} color="#2F3640" loading={state} />
    </div>
  );
};

export default Loader;
