import actions from '../Actions';

const { GET_ARTICLE, GET_ARTICLE_TAGS } = actions;

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
    default:
      return state;
  }
};
