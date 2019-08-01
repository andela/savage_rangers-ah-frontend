import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';

export default combineReducers({ testRedux: testReduxReducer, passwordReset, registration });
