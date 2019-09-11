import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';
import notifications from './notifications';
import readArticleReducer from './readArticleReducer';
import readPopularArticleReducer from './popularArticleReducer';
import authReducer from './auth';
import termsAndConditionReducer from './termsAndcondReducers';
import article from './createArticle';
import bookmark from './Bookmark';
import getArticle from './getArticleReducer';
import commentsReducer from './comments';

import profile from './Profile';

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration,
  notifications,
  termsAndConditionReducer,
  article,
  readArticle: readArticleReducer,
  populars: readPopularArticleReducer,
  bookmark,
  getArticle,
  commentsReducer,
  profile
});
