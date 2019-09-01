import authorsReducer from '../../../../Redux/Reducers/authors';
import actions from '../../../../Redux/Actions';

const authors = [
  {
    id: 2,
    username: 'BurindiAlain2',
    email: 'alain2@gmail.com',
    bio: null,
    profileImage: null,
    Articles: [{ id: 5 }, { id: 6 }],
    followers: [
      { follower: 'Burindi', profileImage: null },
      { follower: 'BurindiAlain3', profileImage: null },
      { follower: 'BurindiAlain44', profileImage: null }
    ]
  },
  {
    id: 42,
    username: 'nkpremices',
    email: 'premices.tuvere@gmail.com',
    bio: 'Here I am',
    profileImage:
      'https://res.cloudinary.com/al-tech/image/upload/v1567175923/m5bfsomeowj7jsq6b2cs.jpg',
    Articles: [{ id: 7 }],
    followers: [{}]
  }
];

describe('TERMS Reducer', () => {
  it('FETCH_AUTHORS_PROFILE_SUCCESS reducer', () => {
    const initialState = { fetchAuthors: true };
    expect(authorsReducer(initialState, {
      type: actions.FETCH_AUTHORS_PROFILE_SUCCESS,
      payload: {
        authors,
        follow: false,
        paginationDetails: {
          pages: 2,
          currentPage: 1,
          pageSize: 10,
          count: 13
        },
        unfollow: false
      }
    })).toEqual({
      fetchAuthors: true,
      authors,
      follow: false,
      paginationDetails: {
        pages: 2,
        currentPage: 1,
        pageSize: 10,
        count: 13
      },
      unfollow: false
    });
  });
  it('FETCH_AUTHORS_PROFILE_FAIL reducer', () => {
    const initialState = { fetchAuthors: false };
    expect(authorsReducer(initialState, {
      type: actions.FETCH_AUTHORS_PROFILE_FAIL,
      payload: {}
    })).toEqual({ fetchAuthors: false });
  });
  it('FOLLOW reducer', () => {
    const initialState = {
      follow: false,
      unfollow: false
    };
    expect(authorsReducer(initialState, { type: actions.FOLLOW })).toEqual({
      follow: true,
      unfollow: false
    });
  });
  it('UNFOLLOW reducer', () => {
    const initialState = {
      follow: false,
      unfollow: false
    };
    expect(authorsReducer(initialState, { type: actions.UNFOLLOW })).toEqual({
      follow: false,
      unfollow: true
    });
  });
  it('UNFOLLOW_FAILED reducer', () => {
    const initialState = {
      follow: false,
      unfollow: false
    };
    expect(authorsReducer(initialState, { type: actions.UNFOLLOW_FAILED })).toEqual({
      follow: false,
      unfollow: false,
      unfollowFailed: true
    });
  });
  it('FOLLOW_FAILED reducer', () => {
    const initialState = {
      follow: false,
      unfollow: false
    };
    expect(authorsReducer(initialState, { type: actions.FOLLOW_FAILED })).toEqual({
      follow: false,
      unfollow: false,
      followFailed: true
    });
  });
});
