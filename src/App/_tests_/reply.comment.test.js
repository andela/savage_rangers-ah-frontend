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
});
