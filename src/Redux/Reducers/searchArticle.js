import actions from '../Actions/index';

const { SEARCH_ARTICLE, SEARCH_ERROR } = actions;

const initialState = [];
export default (state = { searchData: {} }, action) => {
  switch (action.type) {
    case SEARCH_ARTICLE:
      // console.log(action.searchData, '[[[[[[[');
      return { ...state, articles: action.searchData };
    case SEARCH_ERROR:
      initialState.push(action.error);
      return { ...state, error: initialState };
    default:
      return state;
  }
};
