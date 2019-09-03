import actions from '../Actions';

const {
  SHOW_NOTIFICATIONS,
  HIDE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  NOTIFICATIONS_CATCH_ERROR,
  SNOOZE_NOTIFICATION,
  GET_NOTIFICATIONS_CONFIGS,
  GET_USER_PROFILE_ON_LOGIN
} = actions;

const initialState = {
  isShown: false,
  data: {},
  errorMessage: '',
  profile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATIONS:
      return {
        ...state,
        isShown: action.payload
      };
    case HIDE_NOTIFICATIONS:
      return {
        ...state,
        isShown: action.payload
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        data: action.payload
      };
    case SNOOZE_NOTIFICATION:
      return {
        ...state,
        snoozeMessage: action.payload
      };
    case GET_NOTIFICATIONS_CONFIGS:
      return {
        ...state,
        configs: action.payload
      };
    case NOTIFICATIONS_CATCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case GET_USER_PROFILE_ON_LOGIN:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};
