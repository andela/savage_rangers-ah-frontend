import { combineReducers } from 'redux';
import testReduxReducer from './testReduxReducer';
import registration from './Registration';
import passwordReset from './passwordReset';
import notifications from './notifications';
import readArticleReducer from './readArticleReducer';
import readPopularArticleReducer from './popularArticleReducer';
import articleReducer from './articles';
import authReducer from './auth';
import termsAndConditionReducer from './termsAndcondReducers';
import article from './createArticle';
import bookmark from './Bookmark';
import getArticle from './getArticleReducer';
import searchArticle from './searchArticle';

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
  articles: articleReducer,
  stats: articleReducer,
  ratings: articleReducer,
  searchArticle
});
