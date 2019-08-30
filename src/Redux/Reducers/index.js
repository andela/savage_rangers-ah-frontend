import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';
import readArticleReducer from './readArticleReducer';
import readPopularArticleReducer from './popularArticleReducer';
import notifications from './notifications';
import authReducer from './auth';
import article from './createArticle';
import profile from './Profile';
import termsAndConditionReducer from './termsAndcondReducers';
import getArticle from './getArticleReducer';

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration,
  termsAndConditionReducer,
  article,
  getArticle,
  readArticle: readArticleReducer,
  populars: readPopularArticleReducer,
  notifications,
  profile
});
