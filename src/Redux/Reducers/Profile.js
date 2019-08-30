import actions from '../Actions';

const {
  GET_PROFILE,
  GET_FOLLOWER,
  GET_FOLLOWING,
  PROFILE_UPDATED,
  GET_BOOKMARK,
  NO_BOOKMARK,
  REMOVE_BOOKMARK,
  UNFOLLOW,
  NO_FOLLOWING,
  FOLLOW,
  DELETE_ARTICLE_FAILED,
  DELETE_ARTICLE,
  GET_PROFILE_FAILED,
  PROFILE_UPDATED_FAILED,
  UNFOLLOW_FAILED,
  FOLLOW_FAILED,
  NO_FOLLOWER
} = actions;

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        data: action.payload.profile,
        owner: action.payload.owner,
        updated: false,
        deleted: false,
        deleteFailed: false,
        failed: false
      };
    case GET_PROFILE_FAILED:
      return {
        ...state,
        failed: true
      };
    case GET_FOLLOWER:
      return {
        ...state,
        unfollow: false,
        follow: false,
        follower: action.payload.data
      };
      case NO_FOLLOWER:
      return {
        ...state,
        follow: false,
        unfollow: false,
        follower: { followers: [] }
      };
    case GET_FOLLOWING:
      return {
        ...state,
        follow: false,
        unfollow: false,
        following: action.payload.data
      };
    case NO_FOLLOWING:
      return {
        ...state,
        follow: false,
        unfollow: false,
        following: { following: [] }
      };

    case PROFILE_UPDATED:
      return {
        ...state,
        updated: true
      };
    case PROFILE_UPDATED_FAILED:
      return {
        ...state,
        updated: false
      };
    case GET_BOOKMARK:
      return {
        ...state,
        remove: false,
        bookmarks: action.payload.data
      };
    case NO_BOOKMARK:
      return {
        ...state,
        remove: false,
        bookmarks: {}
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        remove: true
      };
    case UNFOLLOW:
      return {
        ...state,
        unfollow: true
      };
    case UNFOLLOW_FAILED:
      return {
        ...state,
        unfollowFailed: true
      };
    case FOLLOW:
      return {
        ...state,
        follow: true
      };
    case FOLLOW_FAILED:
      return {
        ...state,
        followFailed: true
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        deleteFailed: false,
        deleted: true
      };
    case DELETE_ARTICLE_FAILED:
      return {
        ...state,
        deleted: false,
        deleteFailed: true
      };
    default:
      return state;
  }
};
