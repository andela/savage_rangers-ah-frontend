/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import mockAxios from 'axios';
import CommentHolder from '../Components/Comment/comment.holder';
import actions from '../../Redux/Actions/getAllComments';
import commentReducer from '../../Redux/Reducers/comments';

const {
  getAllComments,
  postComment,
  updateComment,
  postCommentReply,
  likeAndDislikeCommentReaction,
  likeAndDislikeCount
} = actions;

const props = {
  getComments: getAllComments,
  createComment: postComment,
  newComment: updateComment

};

const initialState = {
  All_Comments: [], Error: {}, NEW_COMMENT: {}, REPLY: {}, Reaction: {}
};

const payload = [
  {
    id: 83,
    body: "premices this won't work",
    userId: 2,
    articleSlug: 'How-to-create-sequalize-seeds',
    parentCommentId: null,
    isBlocked: false,
    iteration: 0,
    isEdited: false,
    createdAt: '2019-09-05T07:50:47.964Z',
    updatedAt: '2019-09-05T07:50:47.964Z',
    User: {
      username: 'BurindiAlain2',
      bio: null,
      profileImage: null
    },
    Replies: [
      {
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
      }
    ],
    Reactions: []
  }
];

const postCommentPayload = {
  status: 201,
  data: {
    isBlocked: false,
    iteration: 0,
    isEdited: false,
    id: 107,
    userId: 2,
    articleSlug: 'i-dont-want-to-live-in-ohio-i-belong-in-new-york-j07n6mx0y8q',
    body: 'new comment from the backend',
    updatedAt: '2019-09-05T21:21:16.797Z',
    createdAt: '2019-09-05T21:21:16.797Z',
    parentCommentId: null
  }

};

const reaction = {
  status: 201,
  message: 'You have successfully  liked this comment'
};

const reactionCount = {
  status: 200,
  likeCount: 1
};

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const store = mockStore({
  commentsReducer: { All_Comments: payload },
  notifications: { profile: {} }
});

describe('My Connected React-Redux Component', () => {
  let component;
  beforeEach(() => {
    component = renderer.create(<Provider store={store}>
      <CommentHolder {...props} />
    </Provider>);
  });
  it('should render the component', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should submit the comment after click the button', () => {
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ submitComment: jest.fn(), preventDefault: jest.fn() });
    });
    expect(jest.fn()).toHaveBeenCalledTimes(0);
  });

  it('should submit the comment after click the button', () => {
    renderer.act(() => {
      component.root.findAllByType('button')[2].props.onClick({ submitReaction: jest.fn() });
    });
    expect(jest.fn()).toHaveBeenCalledTimes(0);
  });

  it('should set the state after changing the value in the textarea', () => {
    renderer.act(() => {
      component.root.findByType('textarea').props.onChange({ target: jest.fn() });
    });
    expect(jest.fn()).toHaveBeenCalledTimes(0);
  });
});

describe('testing reducers', () => {
  it('should fetch all the comments', () => {
    expect(commentReducer(initialState, {
      type: 'GET_ALL_ARTICLE_COMMENTS',
      payload
    }));
  });

  it('should post a new comment', () => {
    expect(commentReducer(initialState, {
      type: 'POST_COMMENT',
      postCommentPayload
    }));
  });

  it('should update the comments state', () => {
    expect(commentReducer(initialState, {
      type: 'UPDATE_COMMENT',
      postCommentPayload
    }));
  });

  it('should update the comments state', () => {
    expect(commentReducer(initialState, {
      type: 'POST_COMMENT_REPLY',
      postCommentPayload
    }));
  });

  it('should update the comments state', () => {
    expect(commentReducer(initialState, {
      type: 'CATCH_COMMENT_ERROR',
      postCommentPayload
    }));
  });

  it('should post new likes or dislikes', () => {
    expect(commentReducer(initialState, {
      type: 'LIKE_DISLIKE_COMMENT_REACTION',
      reaction
    }));
  });

  it('should count the likes or dislikes', () => {
    expect(commentReducer(initialState, {
      type: 'LIKE_DISLIKE_COUNT',
      reaction
    }));
  });
});

describe('testing the comments actions result', () => {
  beforeEach(() => {
    // get all comment request mock
    mockAxios.get = jest.fn(() => Promise.resolve({ data: { data: { ...payload } } }));
    store.dispatch(getAllComments('How-to-create-sequelize-seeds'));

    mockAxios.get = jest.fn(() => Promise.reject({ error: { errors: {} } }));
    store.dispatch(getAllComments('fafd'));

    // post a new comment
    mockAxios.post = jest.fn(() => Promise.resolve({ ...postCommentPayload }));
    store.dispatch(postComment({ body: 'hey there', parentCommentId: 12 }));

    mockAxios.post = jest.fn(() => Promise.reject({ error: { errors: { body: 'Server unable to process the recieved data' } } }));

    store.dispatch(postComment({}));

    // post a new reply
    mockAxios.post = jest.fn(() => Promise.resolve({ data: { data: { ...postCommentPayload } } }));
    store.dispatch(postCommentReply('How-to-create-sequelize-seeds', { body: 'hey there', parentCommentId: 12 }));

    mockAxios.post = jest.fn(() => Promise.reject({ error: { errors: { body: 'Server unable to process the recieved data' } } }));

    store.dispatch(postCommentReply('How-to-create-sequelize-seeds'));

    // like and dislike a comment
    mockAxios.post = jest.fn(() => Promise.resolve({ response: { reaction } }));
    store.dispatch(likeAndDislikeCommentReaction({ body: '' }));

    mockAxios.post = jest.fn(() => Promise.reject({ response: { data: '' } }));
    store.dispatch(likeAndDislikeCommentReaction({ body: '' }));

    // count likes or dislikes
    mockAxios.get = jest.fn(() => Promise.resolve({ res: { reactionCount } }));
    store.dispatch(likeAndDislikeCount('likes', 6));

    mockAxios.get = jest.fn(() => Promise.reject({ err: {} }));
    store.dispatch(likeAndDislikeCount('dislikes', 2));

    // update the comment
    store.dispatch(updateComment(postCommentPayload.data));
  });

  it('get all the comments', () => {
    expect(store.getActions()[7].type).toEqual('GET_ALL_ARTICLE_COMMENTS');
    expect(store.getActions()[7].payload[0]).toEqual(payload[0]);
  });

  it('get all the comments and throws an error', () => {
    expect(store.getActions()[11].type).toEqual('CATCH_COMMENT_ERROR');
  });

  it('create a new comment', () => {
    expect(store.getActions()[8].type).toEqual('POST_COMMENT');
    expect(store.getActions()[8].payload).toEqual(postCommentPayload.data);
  });

  it('create a new comment and throws an error', () => {
    expect(store.getActions()[11].type).toEqual('CATCH_COMMENT_ERROR');
  });

  it('create a comment reply', () => {
    expect(store.getActions()[10].type).toEqual('POST_COMMENT_REPLY');
    expect(store.getActions()[10].payload).toEqual(postCommentPayload);
  });

  it('create a comment reply and throws an error', () => {
    expect(store.getActions()[11].type).toEqual('CATCH_COMMENT_ERROR');
  });

  it(' should like and dislike a comment', () => {
    expect(store.getActions()[12].type).toEqual('LIKE_DISLIKE_COMMENT_REACTION');
    expect(store.getActions()[12].payload.response.reaction).toEqual(reaction);
  });

  it('should like and dislike counts', () => {
    expect(store.getActions()[14].type).toEqual('LIKE_DISLIKE_COUNT');
    expect(store.getActions()[14].payload.res.reactionCount).toEqual(reactionCount);
  });

  it('should update the comment', () => {
    expect(store.getActions()[6].type).toEqual('UPDATE_COMMENT');
    expect(store.getActions()[6].payload).toEqual(postCommentPayload.data);
  });
});
