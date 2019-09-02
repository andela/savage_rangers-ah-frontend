import actions from '../Actions';

const {
  GET_ALL_ARTICLE_COMMENTS,
  CATCH_ERROR, POST_COMMENT,
  UPDATE_COMMENT,
  POST_COMMENT_REPLY
} = actions;

const initialState = {
  All_Comments: [], Error: {}, NEW_COMMENT: {}, REPLY: {}
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
    case CATCH_ERROR:
      return {
        ...state,
        Error: action.payload
      };
    default:
      return state;
  }
};
