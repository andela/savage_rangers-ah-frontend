import React from 'react';
import { shallow } from '../../../enzyme';
import NavLogo from '../../Components/NavProfile/navLogo';

describe('Testing the Social Media Login Component', () => {
  const navLogo = shallow(<NavLogo />);
  it('renders the social login component', () => {
    expect(navLogo.find('a').exists()).toBe(true);
  });
});
