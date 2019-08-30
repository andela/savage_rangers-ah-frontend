import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import Popular from '../Components/Popular/popular';
import readPopularAction from '../../Redux/Actions/readPopularActions';
// import { ReadArticle, mapStateToProps } from '../Components/DisplayArticle/readArticle';
import readPopularReducer from '../../Redux/Reducers/popularArticleReducer';

const { readPopularArticle } = readPopularAction;
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { Article: {} };
const store = mockStore(initialState);

global.scrollTo = jest.fn();

const articles = [
  {
    id: 6,
    title: 'What you need to know to become a great software engineer in 2020',
    description: '10 Tips to become a great software engineer by 2020.',
    body: 'I get quite a few emails that basically say',
    slug: 'what-you-need-to-know-to-become-a-great-software-engineer-in-2020-nfovo9fghng',
    readTime: 6,
    coverImage:
      'https://res.cloudinary.com/al-tech/image/upload/v1565787533/rvkmbae3pcqhgysxoqnk.jpg',
    author: 42,
    category: 4,
    isBlocked: false,
    status: 'published',
    createdAt: '2019-08-14T12:58:54.185Z',
    updatedAt: '2019-08-16T09:19:39.885Z',
    deletedAt: null,
    Category: { name: 'TECHNOLOGY' },
    User: {
      username: 'MCFrank16',
      firstName: 'Frank',
      lastName: 'Mutabazi'
    }
  }
];

const payload = {
  populars: {
    Popular: {},
    Articles: {
      data: [
        {
          id: 6,
          title: 'What you need to know to become a great software engineer in 2020',
          description: '10 Tips to become a great software engineer by 2020.',
          body: 'I get quite a few emails',
          slug: 'what-you-need-to-know-to-become-a-great-software-engineer-in-2020-nfovo9fghng',
          readTime: 6,
          coverImage:
            'https://res.cloudinary.com/al-tech/image/upload/v1565787533/rvkmbae3pcqhgysxoqnk.jpg',
          author: 42,
          category: 4,
          isBlocked: false,
          status: 'published',
          createdAt: '2019-08-14T12:58:54.185Z',
          updatedAt: '2019-08-14T13:00:34.847Z',
          deletedAt: null,
          User: {
            id: 42,
            username: 'MCFrank16',
            profileImage:
              'https://res.cloudinary.com/al-tech/image/upload/v1565805494/nenxg6yetjfgbk96iq8l.jpg',
            firstName: 'Frank',
            lastName: 'Mutabazi'
          },
          Category: { name: 'TECHNOLOGY' }
        }
      ]
    }
  }
};

describe('testing the popular articles component', () => {
  const popularWrapper = shallow(<Popular articles={articles} />);
  it('should check if the component is rendering the proper jsx elements', () => {
    expect(popularWrapper.find('div').exists()).toBe(true);
    expect(popularWrapper).toMatchSnapshot();
  });

  it('calls window.scrollTo when a popular article is clicked', () => {
    expect(global.scrollTo).toHaveBeenCalledWith(0, 50);
  });
});

describe('testing the read popular articles action', () => {
  it('should dispatch the READ_ARTICLE action and payload', () => {
    mockAxios.get = jest.fn(() => Promise.resolve(articles));
    store.dispatch(readPopularArticle(articles));
    expect(store.getActions()[0]).toMatchSnapshot();
  });

  it('should dispatch the READ_ARTICLE action and payload and throws an error', () => {
    const dataTest = { body: 'this is awesome' };
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: { Article: 'Article is not found' } } } }));
    store.dispatch(readPopularArticle(dataTest));
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('testing the read popular articles reducer', () => {
  test('reducers', () => {
    const state = readPopularReducer(initialState, {
      type: 'GET_POPULAR_ARTICLES',
      payload
    });

    expect(state).toEqual({
      Article: {},
      Articles: { ...payload }
    });
  });
});
