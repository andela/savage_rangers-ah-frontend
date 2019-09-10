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
  getAllComments, postComment, updateComment, postCommentReply
} = actions;

const props = {
  getComments: getAllComments,
  createComment: postComment,
  newComment: updateComment
};

const initialState = {
  All_Comments: [], Error: {}, NEW_COMMENT: {}, REPLY: {}
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
    ]
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

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const store = mockStore({
  commentsReducer: { All_Comments: [] },
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
      component.root.findByType('button').props.onClick({ preventDefault: jest.fn() });
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
      type: 'CATCH_ERROR',
      postCommentPayload
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
  });
  it('get all the comments', () => {
    expect(store.getActions()[5].type).toEqual('GET_ALL_ARTICLE_COMMENTS');
    expect(store.getActions()[5].payload[0]).toEqual(payload[0]);
  });

  it('get all the comments and throws an error', () => {
    expect(store.getActions()[7].type).toEqual('CATCH_ERROR');
  });

  it('create a new comment', () => {
    expect(store.getActions()[6].type).toEqual('POST_COMMENT');
    expect(store.getActions()[6].payload).toEqual(postCommentPayload.data);
  });

  it('create a new comment and throws an error', () => {
    expect(store.getActions()[7].type).toEqual('CATCH_ERROR');
  });

  it('create a comment reply', () => {
    expect(store.getActions()[8].type).toEqual('POST_COMMENT_REPLY');
    expect(store.getActions()[8].payload).toEqual(postCommentPayload);
  });

  it('create a comment reply and throws an error', () => {
    expect(store.getActions()[40].type).toEqual('CATCH_ERROR');
  });
});
