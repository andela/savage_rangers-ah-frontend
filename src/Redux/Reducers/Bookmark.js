import actions from '../Actions';

const { NOT_BOOKMARKED, HAS_BOOKMARKED, BOOKMARK } = actions;

const initialState = { data: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case HAS_BOOKMARKED:
      return {
        ...state,
        bookmarked: false,
        isBookmarked: true
      };
    case NOT_BOOKMARKED:
      return {
        ...state,
        bookmarked: false,
        isBookmarked: false
      };
    case BOOKMARK:
      return {
        ...state,
        bookmarked: true
      };
    default:
      return state;
  }
};
