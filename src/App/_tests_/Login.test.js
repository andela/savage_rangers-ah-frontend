import React from 'react';
import { shallow } from '../../enzyme';
import Login from '../Components/Login/Login';

describe('App', () => {
  const login = shallow(<Login />);
  it('renders the login component', () => {
    expect(login.find('Fragment').exists()).toBe(true);
  });
});