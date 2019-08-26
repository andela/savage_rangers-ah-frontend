import types from '../Actions';

const {
  CREATE_ARTICLE,
  AUTO_SAVE,
  PUBLISH_ARTICLE,
  GET_CATEGORIES,
  GET_TAGS,
  CREATE_ARTICLE_ERROR
} = types;
export const createArticle = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        createdArticle: action.payload
      };
    case AUTO_SAVE:
      return {
        ...state,
        updatedArticle: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case CREATE_ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case PUBLISH_ARTICLE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export default createArticle;
