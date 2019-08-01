import queryString from 'query-string';
import axios from '../../configs/axios';
import types from '.';

const { SEND_RESET_PASSWORD_EMAIL, RESET_PASSWORD, CATCH_ERROR } = types;

export default {
  sendEmail: email => (dispatch) => {
    axios
      .post('/api/password-reset', { email })
      .then((res) => {
        dispatch({ type: SEND_RESET_PASSWORD_EMAIL, payload: res.data });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: CATCH_ERROR, payload: errorMessage });
      });
  },
  resetPassword: password => (dispatch) => {
    axios
      .post(`/api/password-reset/update/${queryString.parse(window.location.search).email}`, { password })
      .then((res) => {
        dispatch({ type: RESET_PASSWORD, payload: res.data });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: CATCH_ERROR, payload: errorMessage });
      });
  }
};
