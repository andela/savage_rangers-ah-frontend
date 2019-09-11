import mockAxios from 'axios';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import profileActions from '../../Redux/Actions/Profile';

const {
  getProfile,
  getFolowers,
  getFollowing,
  updateProfile,
  getBookMarks,
  removeBookmark,
  unfollow,
  follow,
  deleteArticle
} = profileActions;
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const getState = {}; // initial state of the store
const store = mockStore(getState);

const rating = {
  allUsers: 35,
  statistics: [
    {
      rating: 1,
      users: 5,
      percentage: 14
    },
    {
      rating: 2,
      users: 4,
      percentage: 11
    },
    {
      rating: 3,
      users: 9,
      percentage: 26
    },
    {
      rating: 4,
      users: 10,
      percentage: 29
    },
    {
      rating: 5,
      users: 7,
      percentage: 20
    }
  ]
};
const articles = [
  {
    id: 2,
    title: 'How to create sequalize seedss',
    description: 'How to set dummy data automaticallyy',
    body: 'Suppose we want to insert some dataa.',
    slug: 'How-to-create-sequalize-seedss',
    readTime: 4,
    coverImage: 'default.jpeg',
    author: 1,
    category: 1,
    isBlocked: false,
    status: 'published',
    createdAt: '2019-08-14T12:48:02.294Z',
    updatedAt: '2019-08-14T12:48:02.294Z',
    deletedAt: null,
    rating: 0,
    statistics: {
      slug: 'How-to-create-sequalize-seedss',
      stats: {
        reads: 0,
        shares: 0,
        comments: 0
      }
    }
  },
  {
    id: 3,
    title: 'How to create sequalize seedss',
    description: 'How to set dummy data automaticallyy',
    body: 'Suppose we want to insert some dataa.',
    slug: 'How-to-create-sequalize-seedss',
    readTime: 4,
    coverImage: 'default.jpeg',
    author: 1,
    category: 1,
    isBlocked: false,
    status: 'draft',
    createdAt: '2019-08-14T12:48:02.294Z',
    updatedAt: '2019-08-14T12:48:02.294Z',
    deletedAt: null,
    rating,
    statistics: {
      slug: 'How-to-create-sequalize-seedss',
      stats: {
        reads: 0,
        shares: 0,
        comments: 0
      }
    }
  }
];

describe('Actions', () => {
  test('test get profile action', () => {
    mockAxios.get = jest.fn(() => Promise.resolve({
      status: 200,
      data: { profile: { Articles: articles }, data: {}, article: {} }
    }));
    store.dispatch(getProfile(''));
  });
  test('should handle the failed request', () => {
    mockAxios.get = jest.fn(() => Promise.reject({
      response: {
        status: 404,
        message: 'not found'
      }
    }));
    store.dispatch(getProfile(''));
  });
  // update profile
  test('update profile', () => {
    mockAxios.patch = jest.fn(() => Promise.resolve({
      status: 200,
      message: 'updated correctly'
    }));
    store.dispatch(updateProfile({ country: 'Rwanda' }));
  });
  test('update failed', () => {
    mockAxios.patch = jest.fn(() => Promise.reject({
      status: 400,
      message: 'the country is required'
    }));
    store.dispatch(updateProfile({ newThing: 'new' }));
  });
  // get boomark
  test('should get bookmarked articles', () => {
    mockAxios.get = jest.fn(() => Promise.resolve({ data: [{ slug: 'this-is-it' }] }));
    store.dispatch(getBookMarks('alain'));
  });
  test('should handle the not found response', () => {
    mockAxios.get = jest.fn(() => Promise.reject({
      response: {
        status: 404,
        message: 'not found'
      }
    }));
    store.dispatch(getBookMarks('alain'));
  });

  // remove bookmark
  test('should remove a bookmarked article', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ data: { message: 'removed correctly' } }));
    store.dispatch(removeBookmark('slug'));
  });

  // unfollow
  test('should unfollow a user', () => {
    mockAxios.delete = jest.fn(() => Promise.resolve({ data: { message: 'unfollowed' } }));
    store.dispatch(unfollow('alain2'));
  });
  test('should not unfollow the same user', () => {
    mockAxios.delete = jest.fn(() => Promise.reject({
      response: {
        status: 400,
        message: 'you are not following this user'
      }
    }));
    store.dispatch(unfollow('alain2'));
  });

  // follow
  test('should follow a user', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ data: { message: 'followed' } }));
    store.dispatch(follow('alain2'));
  });
  test('should not follow twice the same user', () => {
    mockAxios.post = jest.fn(() => Promise.reject({
      response: {
        status: 400,
        message: 'you are already following this user'
      }
    }));
    store.dispatch(follow('alain2'));
  });

  // delete article
  test('should delete an article', () => {
    mockAxios.delete = jest.fn(() => Promise.resolve({ status: 200 }));
    store.dispatch(deleteArticle('slug-any'));
  });
  test('should handle tha failure', () => {
    mockAxios.delete = jest.fn(() => Promise.reject({ status: 400, response: {} }));
    store.dispatch(deleteArticle('slug-any'));
  });
});
test('test get follower action', () => {
  mockAxios.get = jest.fn(() => Promise.resolve({
    status: 200,
    data: {
      follower: {
        pages: 1,
        currentPage: 1,
        pageSize: 1,
        count: 1,
        followers: [
          {
            follower: 'BurindiAlain2',
            profileImage: 'defaultAvatar.jpg'
          }
        ]
      }
    }
  }));
  store.dispatch(getFolowers());
});

test('test get following action', () => {
  mockAxios.get = jest.fn(() => Promise.resolve({
    status: 200,
    data: {
      following: {
        pages: 1,
        currentPage: 1,
        pageSize: 1,
        count: 1,
        following: [
          {
            follower: 'BurindiAlain2',
            profileImage: 'defaultAvatar.jpg'
          }
        ]
      }
    }
  }));
  store.dispatch(getFollowing());
});

test('should handle errors', () => {
  mockAxios.get = jest.fn(() => Promise.reject({ response: { status: 404, message: 'not found' } }));
  store.dispatch(getFolowers());
  store.dispatch(getFollowing());
});
test('should have dispatched all actions', () => {
  expect(store.getActions()).toEqual([
    {
      type: 'GET_PROFILE',
      payload: { profile: { Articles: articles }, data: {}, article: {} }
    },
    { type: 'GET_PROFILE_FAILED' },
    { type: 'PROFILE_UPDATED' },
    { type: 'PROFILE_UPDATED_FAILED' },
    {
      type: 'GET_BOOKMARK',
      payload: [{ slug: 'this-is-it' }]
    },
    { type: 'NO_BOOKMARK' },
    { type: 'REMOVE_BOOKMARK', payload: 'removed correctly' },
    { type: 'UNFOLLOW', payload: { message: 'unfollowed' } },
    { type: 'UNFOLLOW_FAILED' },
    { type: 'FOLLOW', payload: { message: 'followed' } },
    { type: 'FOLLOW_FAILED' },
    { type: 'DELETE_ARTICLE' },
    { type: 'DELETE_ARTICLE_FAILED', payload: {} },
    {
      type: 'GET_FOLLOWER',
      payload: {
        follower: {
          pages: 1,
          currentPage: 1,
          pageSize: 1,
          count: 1,
          followers: [{ follower: 'BurindiAlain2', profileImage: 'defaultAvatar.jpg' }]
        }
      }
    },
    {
      type: 'GET_FOLLOWING',
      payload: {
        following: {
          pages: 1,
          currentPage: 1,
          pageSize: 1,
          count: 1,
          following: [{ follower: 'BurindiAlain2', profileImage: 'defaultAvatar.jpg' }]
        }
      }
    },
    { type: 'NO_FOLLOWER' },
    { type: 'NO_FOLLOWING' }
  ]);
});
