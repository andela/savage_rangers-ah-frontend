import React from 'react';
import { shallow } from '../../enzyme';
import ParentComment from '../Components/Comment/parent.comment.body';

const parentWrapper = shallow(<ParentComment />);

describe('test the parent comment component to check if it renders appropriately', () => {
  test('should render the component with its props', () => {
    expect(parentWrapper.find('div').exists()).toBe(true);
    expect(parentWrapper).toMatchSnapshot();
  });

  test('toggle the hide and view reply', () => {
    parentWrapper.find('#view-replies').props().onClick();
    expect(parentWrapper.find('#view-replies').props().children[0]).toEqual('Hide Replies');
  });
});
