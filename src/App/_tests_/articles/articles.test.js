import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import { shallow } from '../../../enzyme';
import { Articles, mapStateToProps } from '../../Components/Articles/getArticles/Articles';
import article from './articles';

mapStateToProps({ article: { data: { article: {} } } });
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('<articles />', () => {
  describe('render()', () => {
    it('it should render all articles', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: article.mockArticle }
      };
      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const wrapper = shallow(<Articles store={store} {...props} data />);
      expect(wrapper).toMatchSnapshot();
      expect(store.getState).toMatchSnapshot();
      expect(wrapper.find('div').exists()).toBe(true);
      expect(wrapper.find('navbar').exists()).toBe(true);
      expect(wrapper.find('Footer').exists()).toBe(true);
      expect(typeof article).toBe('object');
    });
  });
});
