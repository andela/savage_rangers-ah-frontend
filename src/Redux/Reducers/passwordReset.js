import actions from '../Actions';

const { SEND_RESET_PASSWORD_EMAIL, RESET_PASSWORD, CATCH_ERROR } = actions;

const initialState = { data: {}, errorMessage: 'empty' };

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_RESET_PASSWORD_EMAIL:
      return {
        ...state,
        data: action.payload
      };
    case RESET_PASSWORD:
      return {
        ...state,
        data: action.payload
      };
    case CATCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
