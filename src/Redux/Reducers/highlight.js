import actions from '../Actions';

export const initialState = {
  loading: false,
  errors: {},
  highlights: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.POST_HIGHLIGHT_SUCCESS:
      return {
        ...state,
        errors: {},
        highlights: [...state.highlights, payload.highlighted.highlighted]
      };
    case actions.POST_HIGHLIGHT_FAIL:
      return {
        ...state,
        highlights: false,
        ...payload
      };
    case actions.FETCH_HIGHLIGHT_SUCCESS:
      return {
        ...state,
        errors: {},
        highlights: payload.highlighted.highlighted
      };
    case actions.FETCH_HIGHLIGHT_FAIL:
      return {
        ...state,
        errors: {},
        highlights: []
      };
    default:
      return state;
  }
};
