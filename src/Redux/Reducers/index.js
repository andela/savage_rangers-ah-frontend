import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';
import readArticleReducer from './readArticleReducer';
import readPopularArticleReducer from './popularArticleReducer';
import notifications from './notifications';
import articleReducer from './articles';
import authReducer from './auth';
import article from './createArticle';
import profile from './Profile';
import termsAndConditionReducer from './termsAndcondReducers';
import getArticle from './getArticleReducer';
import searchArticle from './searchArticle';

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration,
  termsAndConditionReducer,
  article,
  getArticle,
  readArticle: readArticleReducer,
  notifications,
  profile,
  articles: articleReducer,
  stats: articleReducer,
  ratings: articleReducer,
  searchArticle,
  readArticle: readArticleReducer,
  populars: readPopularArticleReducer
});
