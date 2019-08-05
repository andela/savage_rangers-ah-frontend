import types from '.';
import axios from '../../../configs/axios';

const { GET_WELCOME } = types;

/**
 * example of a reducer
 * you can export it as an object of functions(actions)
 * or you can export one by one and access them in your component
 *
 * */
export default {
  getWelcome: () => dispatch => axios
    .get('/')
  // I dispatch the action passing data as payload
    .then(response => dispatch({ type: GET_WELCOME, payload: response.data }))
};
