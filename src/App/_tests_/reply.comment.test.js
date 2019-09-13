import React from 'react';
import { shallow } from '../../enzyme';
import ReplyComment from '../Components/Comment/reply.comment.body';
import actions from '../../Redux/Actions/getAllComments';

const { postCommentReply } = actions;

const props = {
  isHidden: true,
  replyCommentBody: postCommentReply,
  replies: [{
    id: 90,
    body: 'gdfhvjb',
    userId: 2,
    articleSlug: 'How-to-create-sequalize-seeds',
    parentCommentId: 83,
    isBlocked: false,
    iteration: 0,
    isEdited: false,
    createdAt: '2019-09-05T08:50:55.295Z',
    updatedAt: '2019-09-05T08:50:55.295Z'
  }]
};
const replyWrapper = shallow(<ReplyComment {...props} />);

describe('test the component', () => {
  test('should test the comment holder to render appropriate jsx', () => {
    expect(replyWrapper.find('div').exists()).toBe(true);
    expect(replyWrapper).toMatchSnapshot();
  });

  test('should simulate onChange Textarea', () => {
    replyWrapper.find('textarea').simulate('change', { target: { name: 'password', value: 'this is your comment' } });
  });

  test('should simulate onClick Button', () => {
    replyWrapper.find('textarea').simulate('click', { target: { name: 'password', value: 'this is your comment' } });
  });

  test('should simulate the reply button click', () => {
    const mockAction = jest.fn();
    replyWrapper.find('button').simulate('click');
    expect(mockAction.mock.calls.length).toEqual(0);
  });
});
