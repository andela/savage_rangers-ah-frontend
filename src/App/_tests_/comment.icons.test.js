import React from 'react';
import { shallow } from 'enzyme';
import CommentIcon from '../Components/Comment/comment.icons';

const props = {
  commentReaction: jest.fn(),
  reactionCount: [{
    likes: 0,
    dislikes: 1
  }]
};

const iconWrapper = shallow(<CommentIcon {...props} />);

describe('testing the comment icon component', () => {
  test('should render the proper jsx element', () => {
    expect(iconWrapper.find('div').exists()).toBe(true);
    expect(iconWrapper.find('.count_number').exists()).toBe(true);
    expect(iconWrapper.find('.comment-icons').exists()).toBe(true);
    expect(iconWrapper).toMatchSnapshot();
  });

  test('should dislike the comment when the button is clicked', () => {
    expect(iconWrapper.find('button').at(1).simulate('click', { commentReaction: jest.fn() }));
  });

  test('should like the comment when the button is clicked', () => {
    expect(iconWrapper.find('button').at(0).simulate('click', { commentReaction: jest.fn() }));
  });
  describe('resetting the count to 0 so that when the reactionCount length is 0, it can also be tested', () => {
    beforeEach(() => {
      iconWrapper.setProps({ reactionCount: [] });
    });
    it('should set the dislike count to 0', () => {
      expect(iconWrapper.find('button').at(0).simulate('click', { commentReaction: jest.fn() }));
    });

    it('should set the like count to 0', () => {
      expect(iconWrapper.find('button').at(1).simulate('click', { commentReaction: jest.fn() }));
    });
  });
});
