import React from 'react';
import Loader from '../Components/Common/loader';
import { shallow } from '../../enzyme';

describe('loader animation', () => {
  const LoadAnimation = shallow(<Loader />);

  test('should render', () => {
    expect(LoadAnimation.find('ThemeProvider').exists()).toBe(true);
  });
});
