import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';
import authReducer from './auth';

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration
});
