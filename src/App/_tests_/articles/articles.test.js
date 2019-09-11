import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import { shallow } from '../../../enzyme';
import { Articles, mapStateToProps } from '../../Components/Articles/getArticles/Articles';
import articles from './articles';

const { Search } = articles;

mapStateToProps({ articles: { data: { article: {} } }, searchArticle: { data: { article: {} } } });
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const props = {
  getArticles: jest.fn(),
  article: { articles: articles.articles },
  searchArticle: { searchData: articles.Search },
  history: { push: jest.fn() },
  location: { search: 'test' },
  searchArticles: jest.fn()
};

const wrapper = shallow(<Articles store={mockStore} {...props} data />);

describe('Articles', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('Renders the loader', () => {
    expect(wrapper.find('loader').exists()).toEqual(true);
  });

  it('Renders the component', () => {
    wrapper.setState({ isLoading: false });
    expect(wrapper.find('div').exists()).toEqual(true);
    expect(wrapper.find('Connect(Navbar)').exists()).toEqual(true);
  });

  it('Renders the component', () => {
    wrapper.instance().componentWillReceiveProps({ articles });
    wrapper.instance().componentWillReceiveProps({ Search });
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('Handle the pagination', () => {
    wrapper.setState({ isLoading: false });
    const numPage = 2;
    wrapper.instance().changeToNextPage(1);
    wrapper.instance().changeToNextPage(numPage);
    expect(wrapper.instance().state.currentPage).toEqual(1);
  });

  it('Handle the change', () => {
    const update = { target: { value: 'test' } };
    wrapper.instance().handleChange(update);
    expect(wrapper.instance().state.filter).toEqual('title');
  });


  it('Handle the search', () => {
    wrapper.setState({ isLoading: false });
    wrapper.instance().handleSearch();
    expect(wrapper.instance().state.filter).toEqual('title');
  });
});
