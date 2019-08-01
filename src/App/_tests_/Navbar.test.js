import React from 'react';
import { shallow } from '../../enzyme';
import Navbar from '../Components/Common/NavProfile/navbar';

describe('Navbar', () => {
  const navbar = shallow(<Navbar />);
  it('renders the Alert component', () => {
    expect(navbar.find('nav').exists()).toEqual(true);
    expect(navbar.find('Logo').exists()).toEqual(true);
  });
});
