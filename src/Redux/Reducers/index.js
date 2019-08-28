import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';
import authReducer from './auth';
import termsAndConditionReducer from './termsAndcondReducers';
import article from './createArticle';
import getArticle from './getArticleReducer';

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration,
  termsAndConditionReducer,
  article,
  getArticle
});
