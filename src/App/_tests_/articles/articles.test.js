import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import { shallow } from '../../../enzyme';
import { Articles, mapStateToProps } from '../../Components/Articles/getArticles/Articles';
import articles from './articles';

mapStateToProps({ articles: { data: { article: {} } }, searchArticle: { data: { article: {} } } });
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('articles', () => {
  describe('render()', () => {
    it('it should render all articles', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: articles.articles },
        searchArticle: { searchData: articles.Search }
      };
      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);

      const wrapper = shallow(<Articles store={store} {...props} data />);
      expect(wrapper.find('loader').exists()).toBe(true);
      wrapper.setState({ isLoading: false });
      expect(wrapper).toMatchSnapshot();
      expect(store.getState).toMatchSnapshot();
      expect(wrapper.find('div').exists()).toBe(true);
      expect(wrapper.find('Connect(Navbar)').exists()).toBe(true);
      expect(wrapper.find('Footer').exists()).toBe(true);
      wrapper.instance().render();
    });
  });
});
