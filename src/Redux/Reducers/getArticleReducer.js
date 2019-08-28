import actions from '../Actions';

const {
  GET_ARTICLE,
  GET_ARTICLE_TAGS,
  ARTICLE_NOT_FOUND,
  ARTICLE_TAGS_NOT_FOUND,
  GET_DRAFTED_ARTICLE
} = actions;

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    case GET_ARTICLE_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case ARTICLE_NOT_FOUND:
      return {
        ...state,
        notFound: action.payload
      };
    case ARTICLE_TAGS_NOT_FOUND:
      return {
        ...state,
        noTags: action.payload
      };
    case GET_DRAFTED_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    default:
      return state;
  }
};
