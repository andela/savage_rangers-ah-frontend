import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Ratings, mapStateToProps } from '../Components/DisplayArticle/Ratings';
import reducer from '../../Redux/Reducers/articleRatings';
import mockAxios from '../../configs/axios';
import actions from '../../Redux/Actions/articleRatings';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  articleRatings: {
    data: { allUsers: 13, statistics: [{ rating: 1, users: [], percentage: 3.2 }] },
    errorMessage: 'message',
    successMessage: 'message'
  }
};
const store = mockStore(initialState);

mapStateToProps(initialState);

const props = { getRatings: () => jest.fn(), rate: () => Promise.resolve({}) };

const component = shallow(<Ratings {...props} />);
describe('Ratings', () => {
  it('renders the Ratings component', () => {
    component.instance().componentWillReceiveProps({
      ratings: {
        average: '3.2',
        data: { allUsers: 13, statistics: [{ rating: 1, users: [], percentage: 3.2 }] }
      },
      errorMessage: 'empty',
      successMessage: 'success'
    });

    component.instance().render();
    expect(component.find('Fragment').exists()).toEqual(true);
  });

  it('Renders the toast when there is no token', () => {
    component.setState({ redirect: false });
    component.instance().rate(1);
    expect(component.find('ToastContainer').exists()).toEqual(true);
  });

  it('Uses the token to rate', () => {
    // Fires with the token
    localStorage.setItem('token', 'token');
    component.setState({ redirect: false });
    component.instance().rate(1);
    expect(component.find('ToastContainer').exists()).toEqual(true);
    expect(component.state().rating).toEqual(1);
  });

  it('Alerts when the rating is the same', () => {
    // Fires with the token
    localStorage.setItem('token', 'token');
    component.setState({ redirect: false });
    component.instance().rate(1);
    expect(component.find('ToastContainer').exists()).toEqual(true);
  });
});

describe('Actions', () => {
  const ratingsMock = {
    status: 200,
    data: {
      allUsers: 37,
      statistics: [
        {
          rating: 1,
          users: 7,
          percentage: 19
        },
        {
          rating: 3,
          users: 9,
          percentage: 24
        },
        {
          rating: 5,
          users: 7,
          percentage: 19
        },
        {
          rating: 2,
          users: 4,
          percentage: 11
        },
        {
          rating: 4,
          users: 10,
          percentage: 27
        }
      ]
    }
  };

  const rateArticleError = {
    status: 401,
    data: { errors: { ratings: 'you cannot rate twice this article, thanks' } }
  };
  beforeEach((done) => {
    // Dispatching all actions

    // Getting all ratings
    mockAxios.get = jest.fn(() => Promise.resolve({ data: ratingsMock }));

    store.dispatch(actions.getRatings('this is the slug'));

    // Catching errors
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: { ratings: 'no ratings found, thanks' } } } }));
    store.dispatch(actions.getRatings('this is the slug'));

    // Showing users
    store.dispatch(actions.showUsersForRating(true));

    // rating an article
    mockAxios.post = jest.fn(() => Promise.resolve({
      data: {
        status: 200,
        data: { message: 'rated successfully, thanks' }
      }
    }));
    store.dispatch(actions.rate(1, 'slug', 'token'));

    // On error
    // Bad request
    mockAxios.post = jest.fn(() => Promise.reject({
      response: {
        status: 400,
        data: { errors: { ratings: 'you cannot rate twice this article, thanks' } }
      }
    }));
    store.dispatch(actions.rate(1, 'slug', 'token'));

    // Unauthorized
    mockAxios.post = jest.fn(() => Promise.reject({ response: rateArticleError }));
    store.dispatch(actions.rate(1, 'slug', 'token'));
    done();
  });
  it('gets Ratings', () => {
    expect(store.getActions()[5].payload).toEqual(ratingsMock);
    expect(store.getActions()[5].type).toEqual('GET_ARTICLE_RATINGS');
  });
  it('Catches errors', () => {
    expect(store.getActions()[2].payload).toEqual('no ratings found, thanks');
    expect(store.getActions()[2].type).toEqual('GET_ARTICLE_RATINGS_ERROR');
  });
  it('Shows users', () => {
    expect(store.getActions()[0].payload).toEqual(true);
    expect(store.getActions()[0].type).toEqual('SHOW_USERS_FOR_RATINGS');
  });

  it('Rates an article', () => {
    expect(store.getActions()[1].type).toEqual('RATE_ARTICLE');
  });

  it('Catches errors', () => {
    expect(store.getActions()[4].type).toEqual('RATE_ARTICLE_ERROR');
    expect(store.getActions()[4].payload.status).toEqual(401);
  });
});

describe('Reducers', () => {
  let state;
  test('GET_ARTICLE_RATINGS', (done) => {
    state = reducer({ data: {} },
      { type: 'GET_ARTICLE_RATINGS', payload: { articleRatings: { allUsers: 13 } } });
    expect(state).toEqual({
      data: { articleRatings: { allUsers: 13 } },
      successMessage: undefined
    });
    done();
  });

  test('GET_ARTICLE_RATINGS_ERROR', () => {
    state = reducer({ data: {} },
      { type: 'GET_ARTICLE_RATINGS_ERROR', payload: 'no ratings for now, thanks' });
    expect(state).toEqual({
      errorMessage: 'no ratings for now, thanks',
      data: {}
    });
  });

  test('SHOW_USERS_FOR_RATINGS', () => {
    state = reducer({ data: {} }, { type: 'SHOW_USERS_FOR_RATINGS', payload: true });
    expect(state).toEqual({
      areShown: true,
      data: {}
    });
  });

  test('RATE_ARTICLE', () => {
    state = reducer({ data: {} }, { type: 'RATE_ARTICLE', payload: 'Successfully' });
    expect(state).toEqual({
      successMessage: 'Successfully',
      data: {}
    });
  });

  test('RATE_ARTICLE_ERROR', () => {
    state = reducer({ data: {} },
      { type: 'RATE_ARTICLE_ERROR', payload: 'You can not rate an article twice, thanks' });
    expect(state).toEqual({
      errorMessage: 'You can not rate an article twice, thanks',
      data: {}
    });
  });
});
