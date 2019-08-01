import React from 'react';
import { shallow } from '../../enzyme';
import NotFound from '../Components/NotFound/NotFound';

describe('NotFound', () => {
  const notFound = shallow(<NotFound />);
  it('renders the NotFound component', () => {
    expect(notFound.find('Fragment').exists()).toBe(true);
  });
});
