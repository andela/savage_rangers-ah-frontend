import { LOGIN_FAILED, LOGIN_SUCCESS, FETCHING } from '../Actions/types';

export const initialState = { isFetching: false, isAuthorized: false };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING:
      return { ...state, isFetching: true, isAuthorized: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...payload,
        isAuthorized: true
      };

    case LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        ...payload,
        isAuthorized: false
      };
    default:
      return state;
  }
};
