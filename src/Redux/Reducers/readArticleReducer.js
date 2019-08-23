import actions from '../Actions';

const { READ_ARTICLE, GET_ARTICLE_TAGS } = actions;

const initialState = { Article: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case READ_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    case GET_ARTICLE_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
};
