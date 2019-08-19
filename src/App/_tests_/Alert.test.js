import React from 'react';
import Alert from '../Components/Common/Alert';
import { shallow } from '../../enzyme';

const props = {
  type: 'success',
  message: 'done'
};
it('should render the alert component', (done) => {
  shallow(<Alert {...props} />);
  done();
});
