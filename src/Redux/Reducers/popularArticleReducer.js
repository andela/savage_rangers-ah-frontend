import actions from '../Actions';

const { GET_POPULAR_ARTICLES } = actions;

const initialState = { Popular: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_ARTICLES:
      return {
        ...state,
        Articles: action.payload
      };
    default:
      return state;
  }
};
