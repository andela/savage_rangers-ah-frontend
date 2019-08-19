import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';

export default combineReducers({ testRedux: testReduxReducer, registration });
