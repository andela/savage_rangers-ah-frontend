import React from 'react';
import { shallow } from '../../enzyme';
import App from '../App';

describe('App', () => {
  const app = shallow(<App />);
  it('renders Authors haven', () => {
    expect(app.find('BrowserRouter').exists()).toBe(true);
  });
});
