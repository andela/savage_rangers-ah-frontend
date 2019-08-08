import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import passwordReset from './passwordReset';

export default combineReducers({ testRedux: testReduxReducer, passwordReset });
