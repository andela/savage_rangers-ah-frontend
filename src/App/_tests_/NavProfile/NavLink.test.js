import React from 'react';
import { shallow } from '../../../enzyme';
import NavProfile from '../../Components/NavProfile/navLink';

describe('Testing the navbar Component', () => {
  const navLink = shallow(<NavProfile />);
  it('renders the navLink component', () => {
    expect(navLink.find('div').exists()).toBe(true);
  });
});
