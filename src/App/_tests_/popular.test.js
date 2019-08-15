import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Popular, mapStateToProps } from '../Components/Popular/popular';
import populaArticleReducer from '../../Redux/Reducers/popularArticleReducer';
import readArticleActions from '../../Redux/Actions/readArticleActions';
import readPopularActions from '../../Redux/Actions/readPopularActions';

const { readArticle, getTags } = readArticleActions;
const { readPopularArticle } = readPopularActions;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { Article: {} };
const store = mockStore(initialState);

const payload = {
  populars: {
    Popular: {},
    Articles: {
      data: [{
        id: 6,
        title: 'What you need to know to become a great software engineer in 2020',
        description: '10 Tips to become a great software engineer by 2020.',
        body: 'I get quite a few emails',
        slug: 'what-you-need-to-know-to-become-a-great-software-engineer-in-2020-nfovo9fghng',
        readTime: 6,
        coverImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565787533/rvkmbae3pcqhgysxoqnk.jpg',
        author: 42,
        category: 4,
        isBlocked: false,
        status: 'published',
        createdAt: '2019-08-14T12:58:54.185Z',
        updatedAt: '2019-08-14T13:00:34.847Z',
        deletedAt: null,
        User: {
          id: 42, username: 'MCFrank16', profileImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565805494/nenxg6yetjfgbk96iq8l.jpg', firstName: 'Frank', lastName: 'Mutabazi'
        },
        Category: { name: 'TECHNOLOGY' }
      }]
    }
  }
};

mapStateToProps({ populars: {} });
const props = { readPopularArticle: jest.fn() };
const popular = shallow(<Popular {...props} />);
describe('Popular component', () => {
  it('renders the Popular component', () => {
    expect(popular).toBeDefined();
    expect(popular.find('div').exists()).toBe(true);
    expect(popular).toMatchSnapshot();
  });
  it('receive the props', () => {
    popular.setState({ articles: [] });
    popular.instance().componentWillReceiveProps({ popularArticle: { data: [] } });
    expect(popular.instance().props).toEqual(props);
    expect(popular.instance().state).toEqual({ articles: [] });
  });
});

it('should get articles with tags', () => {
  store.dispatch(readArticle());
  store.dispatch(getTags());
  expect(store.getActions()).toEqual([]);
});

it('should get popular articles', () => {
  mockAxios.get = jest.fn(() => Promise.resolve());
  store.dispatch(readPopularArticle());
  expect(store.getActions().length).toEqual(2);
});

test('reducers', () => {
  const state = populaArticleReducer(initialState,
    {
      type: 'GET_POPULAR_ARTICLES',
      payload
    });

  expect(state).toEqual({
    Article: {},
    Articles: { ...payload }
  });
});

describe('testing the get popular article action', () => {
  it('should get all popular articles when fetching them is properly executed', () => {
    const dataTest = { body: 'this is awesome' };
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: {} } } }));
    store.dispatch(readPopularArticle(dataTest));
    expect(store.getActions().length).toEqual(2);
  });
});
