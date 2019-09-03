// import queryString from 'query-string';
import axios from '../../configs/axios';
import types from '.';

const {
  SHOW_NOTIFICATIONS,
  HIDE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  NOTIFICATIONS_CATCH_ERROR,
  SNOOZE_NOTIFICATION,
  GET_NOTIFICATIONS_CONFIGS,
  GET_USER_PROFILE_ON_LOGIN
} = types;

export default {
  show: () => dispatch => dispatch({ type: SHOW_NOTIFICATIONS, payload: true }),
  hide: () => dispatch => dispatch({ type: HIDE_NOTIFICATIONS, payload: false }),
  get: token => (dispatch) => {
    axios
      .get('/api/notifications/unseen', { headers: { authorization: token } })
      .then((res) => {
        dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: NOTIFICATIONS_CATCH_ERROR, payload: errorMessage });
      });
  },

  snooze: (operation, token) => (dispatch) => {
    axios
      .patch(`/api/notifications/configuration/${operation}`,
        { data: {} },
        { headers: { authorization: token } })
      .then((res) => {
        dispatch({ type: SNOOZE_NOTIFICATION, payload: res.data });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: NOTIFICATIONS_CATCH_ERROR, payload: errorMessage });
      });
  },

  getConfigs: token => (dispatch) => {
    axios
      .get('/api/notifications/configuration', { headers: { authorization: token } })
      .then((res) => {
        dispatch({ type: GET_NOTIFICATIONS_CONFIGS, payload: res.data });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: NOTIFICATIONS_CATCH_ERROR, payload: errorMessage });
      });
  },

  getProfile: token => (dispatch) => {
    axios
      .get('/api/profiles/', { headers: { authorization: token } })
      .then((res) => {
        dispatch({ type: GET_USER_PROFILE_ON_LOGIN, payload: res.data });
      })
      .catch((error) => {
        const { response: { status } } = error;
        if (status === 401) {
          localStorage.removeItem('token');
          window.location.href = 'login';
          dispatch({ type: NOTIFICATIONS_CATCH_ERROR, payload: error });
        } else {
          const errorObject = error.response.data.errors;
          const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
          dispatch({ type: NOTIFICATIONS_CATCH_ERROR, payload: errorMessage });
        }
      });
  }
};
