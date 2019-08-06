import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import articles from './articles';

export default combineReducers({ testRedux: testReduxReducer, articles });
