import React from 'react';
import { shallow } from '../../../enzyme';
import Navbar from '../../Components/NavProfile/navbar';

describe('Testing the navbar Component', () => {
  const navBar = shallow(<Navbar />);
  it('renders the navbar component', () => {
    expect(navBar.find('div').exists()).toBe(false);
  });
});
