import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import { shallow } from '../../../enzyme';
import Article from '../../Components/Articles/getArticles/Article';
import countRating from '../../../Helpers/countRating';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('<articles />', () => {
  describe('render()', () => {
    it('should give rating', () => {
      const statistics = [
        { rating: 1, users: 1, percentage: 50 },
        { rating: 5, users: 1, percentage: 50 }
      ];
      expect(countRating(statistics)).toBe(3);
    });

    it('it should render a single article', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: [{}] },
        data: {
          body: 'hello',
          title: 'hi',
          coverImage: 'image',
          createdAt: '2019-08-14T12:48:02',
          Category: { name: 'LOVE' },
          User: {
            firstName: 'Alain',
            lastName: 'Burindi',
            profileImage: 'noimage.jpg',
            username: 'Burindi'
          },
          rating: { allUsers: 0, statistics: Array(0) },
          stats: { reads: 9, shares: 5, comments: 4 }

        }
      };

      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const article = shallow(<Article store={store} {...props} />);
      expect(Article).toMatchSnapshot();
      expect(article.find('ContextProvider').exists()).toBe(true);
      expect(article.find('Article').exists()).toBe(true);
      article.render();
    });

    it('it should render a single with deferent data', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: [{}] },
        data: {
          body: 'Flash-forward 100 years, and mental health experts today echo many of Sadler’s sentiments — albeit using different language. “Worry is part of human nature,” says Robert Leahy, a New York-based clinical psychologist and associate editor of the International Journal of Cognitive Therapy',
          title: 'Most Things You Worry About Will Never Actually Happen',
          coverImage: 'default.jpeg',
          createdAt: '2019-08-14T12:48:02',
          Category: { name: 'TECHNOLOGY' },
          User: {
            firstName: null,
            lastName: null,
            profileImage: 'defaultAvatar.jpg',
            username: 'Burindi'
          },
          rating: { allUsers: 0, statistics: Array(0) },
          stats: { reads: 9, shares: 5, comments: 4 }

        }
      };

      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const article = shallow(<Article store={store} {...props} />);
      expect(Article).toMatchSnapshot();
      expect(article.find('ContextProvider').exists()).toBe(true);
      expect(article.find('Article').exists()).toBe(true);
      article.render();
    });

    it('it should render a single with deferent data to cover all lines', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: [{}] },
        data: {
          body: 'hello',
          title: 'Most Things You Worry About Will Never Actually Happen',
          coverImage: null,
          createdAt: '2019-08-14T12:48:02',
          Category: { name: 'MUSIC' },
          User: {
            firstName: null,
            lastName: null,
            profileImage: null,
            username: 'Burindi'
          },
          rating: { allUsers: 0, statistics: Array(0) },
          stats: { reads: 9, shares: 5, comments: 4 }

        }
      };

      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const article = shallow(<Article store={store} {...props} />);
      expect(Article).toMatchSnapshot();
      expect(article.find('ContextProvider').exists()).toBe(true);
      expect(article.find('Article').exists()).toBe(true);
      article.render();
    });

    it('it should render a single with deferent data to cover all lines', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: [{}] },
        data: {
          body: 'hello',
          title: 'Most Things You Worry About Will Never Actually Happen',
          coverImage: null,
          createdAt: '2019-08-14T12:48:02',
          Category: { name: 'BUSINESS' },
          User: {
            firstName: null,
            lastName: null,
            profileImage: 'holler',
            username: 'Burindi'
          },
          rating: { allUsers: 0, statistics: Array(0) },
          stats: { reads: 9, shares: 5, comments: 4 }
        }
      };

      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const article = shallow(<Article store={store} {...props} />);
      expect(Article).toMatchSnapshot();
      expect(article.find('ContextProvider').exists()).toBe(true);
      expect(article.find('Article').exists()).toBe(true);
      article.render();
    });

    it('it should render a single with deferent data to cover all lines', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: [{}] },
        data: {
          body: 'hello',
          title: 'Most Things You Worry About Will Never Actually Happen',
          coverImage: null,
          createdAt: '2019-08-14T12:48:02',
          Category: { name: 'ART' },
          User: {
            firstName: null,
            lastName: null,
            profileImage: 'holler',
            username: 'Burindi'
          },
          rating: { allUsers: 0, statistics: Array(0) },
          stats: { reads: 9, shares: 5, comments: 4 }

        }
      };

      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const article = shallow(<Article store={store} {...props} />);
      expect(Article).toMatchSnapshot();
      expect(article.find('ContextProvider').exists()).toBe(true);
      expect(article.find('Article').exists()).toBe(true);
      article.render();
    });

    it('it should render a single with deferent data to cover all lines', () => {
      const get = jest.fn(() => { });
      const props = {
        getArticles: get,
        article: { articles: [{}] },
        data: {
          body: 'hello',
          title: 'Most Things You Worry About Will Never Actually Happen',
          coverImage: null,
          createdAt: '2019-08-14T12:48:02',
          Category: { name: 'KAKAKA' },
          User: {
            firstName: null,
            lastName: null,
            profileImage: 'holler',
            username: 'Burindi'
          },
          rating: { allUsers: 0, statistics: Array(0) },
          stats: { reads: 9, shares: 5, comments: 4 }

        }
      };

      const normalStats = { testRedux: {} };
      const store = mockStore(normalStats);
      const article = shallow(<Article store={store} {...props} />);
      expect(Article).toMatchSnapshot();
      expect(article.find('ContextProvider').exists()).toBe(true);
      expect(article.find('Article').exists()).toBe(true);
      article.render();
    });
  });
});
