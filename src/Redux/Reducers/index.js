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

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration,
  article,
  readArticle: readArticleReducer,
  populars: readPopularArticleReducer,
  notifications,
  profile
});
