import actions from '../Actions';

const { SIGNOUT, SIGNOUT_ERROR } = actions;

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNOUT:
      return { ...state, logout: action.payload };
    case SIGNOUT_ERROR:
      return { ...state, logoutError: action.payload };
    default:
      return state;
  }
};
