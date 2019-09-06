import actions from '../Actions/index';

const { SEARCH_ARTICLE, SEARCH_ERROR } = actions;

export default (state = { searchData: {} }, action) => {
  switch (action.type) {
    case SEARCH_ARTICLE:
      return { ...state, articles: action.searchData, searchFailed: false };
    case SEARCH_ERROR:
      return { ...state, searchFailed: true };
    default:
      return state;
  }
};
