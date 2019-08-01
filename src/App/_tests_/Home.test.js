import React from 'react';
import { shallow } from '../../enzyme';
import Home from '../Components/Home/Home';

describe('Home', () => {
  const home = shallow(<Home />);
  it('renders the Home component', () => {
    expect(home.find('h1').text()).toEqual('Authors Heaven');
    expect(home.find('p').text()).toEqual('This is the home page of authors heaven v 1.0.0');
  })
});
