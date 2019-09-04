import React from 'react';
import { shallow } from '../../enzyme';
import TriangularPopup from '../Components/Common/TriangularPopup';

describe('TriangularPopup', () => {
  it('renders the TriangularPopup component', () => {
    const triangle = shallow(<TriangularPopup direction="up" />);
    expect(triangle.find('div').exists()).toEqual(true);
  });
});
