import actions from '../Actions/index';

const { GET_ARTICLES, ARTICLES_ERROR } = actions;

const normalStats = [];
export default (state = { articlesData: {} }, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.articlesData };
    case ARTICLES_ERROR:
      normalStats.push(action.error);
      return { ...state, error: normalStats };
    default:
      return state;
  }
};
