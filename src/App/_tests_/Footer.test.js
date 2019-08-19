import React from 'react';
import { shallow } from '../../enzyme';
import Footer from '../Components/Common/Footer';

describe('NavLogo', () => {
  const footer = shallow(<Footer />);
  it('renders the Alert component', () => {
    expect(footer.find('div').text()).toEqual('© Authors Haven2019');
  });
});
