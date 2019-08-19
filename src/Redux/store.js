import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';

const middleware = [thunk];

const isDevelopment = process.env.NODE_ENV === 'development';

export default createStore(rootReducer,
  isDevelopment
    ? compose(applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    : compose(applyMiddleware(...middleware)));
