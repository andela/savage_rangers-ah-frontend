import actions from '../Actions';

const { FETCH_ONE_ARTICLE, GET_ARTICLE_TAGS, READ_ARTICLE_ERROR } = actions;

const initialState = { Article: {}, error: 'empty' };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONE_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    case GET_ARTICLE_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case READ_ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
