import React from 'react';
import { shallow } from '../../enzyme';
import NotFound from '../Components/NotFound/NotFound';

describe('App', () => {
  const notFound = shallow(<NotFound />);
  it('renders the login component', () => {
    expect(notFound.find('Fragment').exists()).toBe(true);
  });
});
