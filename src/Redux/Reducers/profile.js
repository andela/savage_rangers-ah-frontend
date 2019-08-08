import actions from '../Actions';

const { GET_PROFILE, CATCH_ERROR } = actions;

const initialState = { data: {}, errorMessage: 'empty' };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        userProfile: action.payload
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
