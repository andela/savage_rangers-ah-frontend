import { FETCHING, LOGIN_SUCCESS, LOGIN_FAILED } from './types';
import axios from '../../configs/axios';

export default ({ Email, Password }) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING });
    const { data } = await axios.post('api/users/login', { email: Email, password: Password });
    const { message, user } = data;
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    return dispatch({ type: LOGIN_SUCCESS, payload: { message, user } });
  } catch (error) {
    const { data: { errors } } = error.response;
    return dispatch({ type: LOGIN_FAILED, payload: { errors } });
  }
};
