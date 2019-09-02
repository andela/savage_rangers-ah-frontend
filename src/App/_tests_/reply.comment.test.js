import React from 'react';
import { shallow } from '../../enzyme';
import ReplyComment from '../Components/Comment/reply.comment.body';
import actions from '../../Redux/Actions/getAllComments';

const { postCommentReply } = actions;

const props = { isHidden: true, replyCommentBody: postCommentReply };
const replyWrapper = shallow(<ReplyComment {...props} />);

const props2 = { isHidden: false }; // check for the null value
shallow(<ReplyComment {...props2} />); // check for the null value

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
