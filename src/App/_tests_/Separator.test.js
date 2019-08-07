import React from 'react';
import { shallow } from '../../enzyme';
import Separator from '../Components/Separator/or_separator';

const props = { name: 'or' };

describe('Testing The OR separator', () => {
  const orSeparator = shallow(<Separator {...props} />);
  it('renders the OR separator page', () => {
    expect(orSeparator.find('div').exists()).toBe(true);
    expect(orSeparator.find('div').hasClass('or-separator'));
    expect(orSeparator.find('b').text()).toEqual('or');
  });
});
