import actions from '../Actions';

const {
  GET_ARTICLE_RATINGS,
  GET_ARTICLE_RATINGS_ERROR,
  SHOW_USERS_FOR_RATINGS,
  RATE_ARTICLE,
  RATE_ARTICLE_ERROR
} = actions;

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLE_RATINGS:
      return {
        ...state,
        successMessage: undefined,
        data: action.payload
      };
    case GET_ARTICLE_RATINGS_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SHOW_USERS_FOR_RATINGS:
      return {
        ...state,
        areShown: action.payload
      };
    case RATE_ARTICLE:
      return {
        ...state,
        successMessage: action.payload
      };
    case RATE_ARTICLE_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
