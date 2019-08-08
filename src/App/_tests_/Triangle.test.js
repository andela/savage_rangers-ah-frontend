import React from 'react';
import { shallow } from '../../enzyme';
import Triangle from '../Components/Common/TriangularPopup';

describe('Home', () => {
  it('renders the Home component', () => {
    const triangle = shallow(<Triangle direction="up" />);
    expect(triangle.find('div').exists()).toEqual(true);
  });
});
