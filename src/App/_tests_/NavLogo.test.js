import React from 'react';
import { shallow } from '../../enzyme';
import NavLogo from '../Components/Common/NavProfile/navLogo';

describe('NavLogo', () => {
  const navLogo = shallow(<NavLogo />);
  it('renders the NavLogo component', () => {
    expect(navLogo.find('a').exists()).toEqual(true);
  });
});
