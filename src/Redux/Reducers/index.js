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

export default combineReducers({
  authReducer,
  testRedux: testReduxReducer,
  passwordReset,
  registration,
  notifications,
  termsAndConditionReducer,
  article,
  readArticle: readArticleReducer,
  populars: readPopularArticleReducer
});
