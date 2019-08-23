import actions from '../Actions';

const {
  GET_PROFILE,
  GET_FOLLOWER,
  GET_FOLLOWING,
  PROFILE_UPDATED,
  GET_BOOKMARK,
  NO_BOOKMARK
} = actions;

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        data: action.payload.profile,
        updated: false
      };
    case GET_FOLLOWER:
      return {
        ...state,
        follower: action.payload.data
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload.data
      };
    case PROFILE_UPDATED:
      return {
        ...state,
        updated: true
      };
    case GET_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload.data
      };
    case NO_BOOKMARK:
      return {
        ...state,
        bookmarks: {}
      };
    default:
      return state;
  }
};
