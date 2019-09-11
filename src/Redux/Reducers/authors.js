import actions from '../Actions';

export const initialState = { fetchAuthors: true };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_AUTHORS_PROFILE_SUCCESS:
      return {
        ...state,
        fetchAuthors: true,
        authors: payload.authors,
        paginationDetails: payload.paginationDetails,
        follow: false,
        unfollow: false
      };
    case actions.FETCH_AUTHORS_PROFILE_FAIL:
      return {
        ...state,
        fetchAuthors: false,
        ...payload
      };
    case actions.FOLLOW:
      return {
        ...state,
        follow: true,
        unfollow: false
      };
    case actions.UNFOLLOW:
      return {
        ...state,
        follow: false,
        unfollow: true
      };
    case actions.UNFOLLOW_FAILED:
      return {
        ...state,
        follow: false,
        unfollow: false,
        unfollowFailed: true
      };
    case actions.FOLLOW_FAILED:
      return {
        ...state,
        follow: false,
        unfollow: false,
        followFailed: true
      };
    default:
      return state;
  }
};
