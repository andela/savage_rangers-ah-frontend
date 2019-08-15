import React from 'react';
import { shallow } from '../../../enzyme';
import NavProfile from '../../Components/NavProfile/navbarProfile';

describe('Testing the navbar Component', () => {
  const navprofile = shallow(<NavProfile />);
  it('renders the navprofile component', () => {
    expect(navprofile.find('div').exists()).toBe(true);
  });
});
