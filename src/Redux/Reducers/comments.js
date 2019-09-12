import actions from '../Actions';

const {
  GET_ALL_ARTICLE_COMMENTS,
  CATCH_COMMENT_ERROR, POST_COMMENT,
  UPDATE_COMMENT,
  POST_COMMENT_REPLY,
  LIKE_DISLIKE_COMMENT_REACTION,
  LIKE_DISLIKE_COUNT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  REPORT_COMMENT
} = actions;

const initialState = {
  All_Comments: [],
  Error: {},
  NEW_COMMENT: {},
  REPLY: {},
  Reaction: {},
  Counter: {},
  MODIFIED_COMMENT: {},
  MESSAGE: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLE_COMMENTS:
      return {
        ...state,
        All_Comments: action.payload
      };
    case POST_COMMENT:
      return {
        ...state,
        NEW_COMMENT: action.payload
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        All_Comments: [action.payload, ...state.All_Comments]
      };
    case POST_COMMENT_REPLY:
      return {
        ...state,
        REPLY: action.payload
      };
    case LIKE_DISLIKE_COMMENT_REACTION:
      return {
        ...state,
        Reaction: action.payload
      };
    case LIKE_DISLIKE_COUNT:
      return {
        ...state,
        Count: action.payload
      };
    case EDIT_COMMENT:
      return {
        ...state,
        MODIFIED_COMMENT: action.payload
      };
    case DELETE_COMMENT:
      return {
        ...state,
        MESSAGE: action.payload
      };
    case REPORT_COMMENT:
      return {
        ...state,
        MESSAGE: action.payload
      };
    case CATCH_COMMENT_ERROR:
      return {
        ...state,
        Error: action.payload
      };
    default:
      return state;
  }
};
