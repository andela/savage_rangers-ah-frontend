import React from 'react';
import { shallow } from '../../enzyme';
import Alert from '../Components/Common/Alert';

describe('Alert', () => {
  const alert = shallow(<Alert type="success" message="this is good" cssClass="" />);
  it('renders the Alert component', () => {
    expect(alert.find('div').text()).toEqual(' this is good');
  });
});
