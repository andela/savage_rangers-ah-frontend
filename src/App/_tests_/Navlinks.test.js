import React from 'react';
import { shallow } from '../../enzyme';
import NavLinks from '../Components/Common/NavProfile/navLinks';

describe('NavLinks', () => {
  it('renders the NavLinks component', () => {
    const navLinks = shallow(<NavLinks />);
    expect(navLinks.find('div').exists()).toEqual(true);
  });
});
