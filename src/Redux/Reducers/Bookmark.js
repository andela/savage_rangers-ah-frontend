import actions from '../Actions';

const { GET_BOOKMARK, NO_BOOKMARK, BOOKMARK } = actions;

const initialState = { data: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARK:
      return {
        ...state,
        bookmarked: false,
        bookmarks: action.payload
      };
    case NO_BOOKMARK:
      return {
        ...state,
        bookmarked: false,
        bookmarks: []
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
