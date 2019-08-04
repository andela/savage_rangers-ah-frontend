import React from 'react';
import Alert from '../../../Components/Common/Alert';
import { shallow } from '../../../../enzyme';

const props = {
  type: 'success',
  message: 'done',
  cssClass: 'danger'
};
it('should render the alert component', (done) => {
  shallow(<Alert {...props} />);
  done();
});
