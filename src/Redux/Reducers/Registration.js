import actions from '../Actions';

const { REGISTER, CATCH_ERROR } = actions;

const initialState = { data: {} };

/**
 * the data is in the action object in my case i
 *passed it as payload in my getWelcome action when dispatching
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        message: action.payload
      };
    case CATCH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
};
