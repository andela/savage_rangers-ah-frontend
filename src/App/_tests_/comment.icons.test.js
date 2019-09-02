import React from 'react';
import { shallow } from 'enzyme';
import CommentIcon from '../Components/Comment/comment.icons';

const iconWrapper = shallow(<CommentIcon />);

describe('testing the comment icon component', () => {
  test('should render the proper jsx element', () => {
    expect(iconWrapper.find('div').exists()).toBe(true);
    expect(iconWrapper.find('#number').exists()).toBe(true);
    expect(iconWrapper.find('.comment-icons').exists()).toBe(true);
    expect(iconWrapper).toMatchSnapshot();
  });
});
