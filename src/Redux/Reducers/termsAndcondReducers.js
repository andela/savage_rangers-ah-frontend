import actions from '../Actions';

export const initialState = { termsAndConditions: '' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_TERMS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
