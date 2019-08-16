import reducers from '../../Redux/Reducers/Profile';
import { mapStateToProps } from '../Components/Profile/Profile';

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

describe('Reducers', () => {
  test('GET_PROFILE', () => {
    const state = reducers({},
      { type: 'GET_PROFILE', payload: { profile: { Articles: articles } } });
    expect(state).toEqual({
      data: { Articles: articles },
      deleteFailed: false,
      deleted: false,
      failed: false,
      owner: undefined,
      updated: false
    });
  });

  test('GET_PROFILE_FAILED', () => {
    const state = reducers({}, { type: 'GET_PROFILE_FAILED' });
    expect(state).toEqual({ failed: true });
  });

  test('NO_FOLLOWER', () => {
    const state = reducers({}, { type: 'NO_FOLLOWER' });
    expect(state).toEqual({
      follow: false,
      unfollow: false,
      followers: []
    });
  });

  test('UNFOLLOW', () => {
    const state = reducers({}, { type: 'UNFOLLOW' });
    expect(state).toEqual({ unfollow: true });
  });

  test('UNFOLLOW_FAILED', () => {
    const state = reducers({}, { type: 'UNFOLLOW_FAILED' });
    expect(state).toEqual({ unfollowFailed: true });
  });

  test('FOLLOW', () => {
    const state = reducers({}, { type: 'FOLLOW' });
    expect(state).toEqual({ follow: true });
  });

  test('FOLLOW_FAILED', () => {
    const state = reducers({}, { type: 'FOLLOW_FAILED' });
    expect(state).toEqual({ followFailed: true });
  });

  test('DELETE_ARTICLE', () => {
    const state = reducers({}, { type: 'DELETE_ARTICLE' });
    expect(state).toEqual({ deleteFailed: false, deleted: true });
  });

  test('DELETE_ARTICLE_FAILED', () => {
    const state = reducers({}, { type: 'DELETE_ARTICLE_FAILED' });
    expect(state).toEqual({ deleteFailed: true, deleted: false });
  });

  test('NO_FOLLOWING', () => {
    const state = reducers({}, { type: 'NO_FOLLOWING' });
    expect(state).toEqual({
      follow: false,
      unfollow: false,
      following: []
    });
  });

  test('PROFILE_UPDATED', () => {
    const state = reducers({}, { type: 'PROFILE_UPDATED' });
    expect(state).toEqual({ updated: true });
  });

  test('PROFILE_UPDATED_FAILED', () => {
    const state = reducers({}, { type: 'PROFILE_UPDATED_FAILED' });
    expect(state).toEqual({ updated: false });
  });
  test('GET_BOOKMARK', () => {
    const state = reducers({}, { type: 'GET_BOOKMARK', payload: { data: [] } });
    expect(state).toEqual({
      remove: false,
      bookmarks: []
    });
  });

  test('NO_BOOKMARK', () => {
    const state = reducers({}, { type: 'NO_BOOKMARK' });
    expect(state).toEqual({
      remove: false,
      bookmarks: {}
    });
  });

  test('REMOVE_BOOKMARK', () => {
    const state = reducers({}, { type: 'REMOVE_BOOKMARK' });
    expect(state).toEqual({ remove: true });
  });

  test('GET_FOLLOWER', () => {
    const state = reducers({}, { type: 'GET_FOLLOWER', payload: { data: { followers: [] } } });
    expect(state).toEqual({ followers: [], follow: false, unfollow: false });
  });
  test('GET_FOLLOWING', () => {
    const state = reducers({}, { type: 'GET_FOLLOWING', payload: { data: { following: [] } } });
    expect(state).toEqual({ following: [], follow: false, unfollow: false });
  });
});

test('map state to prop', () => {
  mapStateToProps({ profile: { data: {}, followers: [], following: [] } });
});
