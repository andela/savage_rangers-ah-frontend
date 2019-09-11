import actions from '../Actions';

const {
  GET_NAV_CATEGORIES,
  GET_NAV_CATEGORIES_ERROR,
  GET_ARTICLES_BY_CATEGORY,
  GET_RANDOM_ARTICLES,
  GET_RANDOM_ARTICLES_ERROR
} = actions;

const initialState = { error: null, categories: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NAV_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      };
    case GET_NAV_CATEGORIES_ERROR:
      return {
        ...state,
        CategoriesError: action.payload
      };
    case GET_ARTICLES_BY_CATEGORY:
      return {
        ...state,
        articles: action.payload
      };
    case GET_RANDOM_ARTICLES:
      return {
        ...state,
        randomArticles: action.payload
      };
    case GET_RANDOM_ARTICLES_ERROR:
      return {
        ...state,
        error: action.payload
      };
    // case NOTIFICATIONS_CATCH_ERROR:
    //   return {
    //     ...state,
    //     errorMessage: action.payload
    //   };
    // case GET_USER_PROFILE_ON_LOGIN:
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case MARK_NOTIFICATION_AS_READ:
    //   return {
    //     ...state,
    //     updateMessage: action.payload
    //   };
    // case MARK_ALL_NOTIFICATIONS_AS_READ:
    //   return {
    //     ...state,
    //     messages: action.payload
    //   };
    // case GET_IO_NOTIFICATION:
    //   return {
    //     ...state,
    //     io: action.payload
    //   };
    default:
      return state;
  }
};
