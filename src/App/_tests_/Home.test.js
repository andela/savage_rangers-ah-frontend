import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Home, mapStateToProps } from '../Components/Home/Home';
import actions from '../../Redux/Actions/home';
import mockAxios from '../../configs/axios';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

mapStateToProps({
  home: {
    categories: [],
    randomArticles: [],
    articles: [],
    recentArticles: []
  },
  populars: { Articles: [] }
});

const props = {
  getArticlesByCategory: jest.fn(),
  readPopularArticle: jest.fn(),
  getRandomArticles: jest.fn(),
  getRecentArticles: jest.fn(),
  categories: []
};

const home = shallow(<Home {...props} store={store} />);

const categories = {
  categories: [
    {
      id: 1,
      name: 'name'
    }
  ]
};

const article = {
  data: [
    {
      id: 1,
      User: { username: 'username' },
      Category: {
        id: 1,
        name: 'name'
      },
      body: 'body'
    }
  ]
};

describe('Home', () => {
  it('renders the Home component', () => {
    expect(home.find('RandomHeader').exists()).toEqual(true);
    expect(home.find('RecentlyAdded').exists()).toEqual(true);

    // Dispatching an action for the next test
    mockAxios.get = jest.fn(() => Promise.resolve({ data: { ...categories } }));
    store.dispatch(actions.getCategories());
  });
  it('receives categories', () => {
    home.instance().componentDidUpdate({ categories: [] });
    expect(store.getActions()[0].type).toEqual('GET_NAV_CATEGORIES');
    expect(store.getActions()[0].payload).toEqual({ ...categories });

    // Dispatching an action for the next test
    mockAxios.get = jest.fn(() => Promise.resolve({ data: { ...article } }));
    store.dispatch(actions.getArticlesByCategory([categories.categories]));
  });

  it('receives popular articles', () => {
    home.setProps({ popularArticles: article });
    home.instance().render();
    expect(store.getActions()[1].type).toEqual('GET_ARTICLES_BY_CATEGORY');
    expect(store.getActions()[1].payload).toEqual([[{ ...article.data[0] }]]);
  });
});
