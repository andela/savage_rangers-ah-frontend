import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import readArticleActions from '../../Redux/Actions/readArticleActions';

import { ReadArticle, mapStateToProps } from '../Components/DisplayArticle/readArticle';
import Readreducer from '../../Redux/Reducers/readArticleReducer';

const { readArticle, getTags } = readArticleActions;
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { Article: {} };
const store = mockStore(initialState);

const payload = {
  article: {
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
      lastName: 'Mutabazi',
      profileImage:
        'https://res.cloudinary.com/al-tech/image/upload/v1565805494/nenxg6yetjfgbk96iq8l.jpg'
    }
  }
};

const tagPayload = {
  tags: {
    status: 200,
    data: [
      {
        id: 4,
        name: 'Software',
        createdAt: '2019-08-14T12:56:55.150Z',
        updatedAt: '2019-08-14T12:56:55.150Z'
      },
      {
        id: 6,
        name: 'Growing',
        createdAt: '2019-08-14T12:56:55.152Z',
        updatedAt: '2019-08-14T12:56:55.152Z'
      },
      {
        id: 5,
        name: 'Engineering',
        createdAt: '2019-08-14T12:56:55.151Z',
        updatedAt: '2019-08-14T12:56:55.151Z'
      }
    ]
  }
};

const errorPayload = { error: { Article: 'Article not found' } };

mapStateToProps({ readArticle: {}, populars: {}, bookmark: { bookmarks: {}, bookmarked: false } });
const match = { params: { slug: 'slug' } };

const props = {
  readArticle: jest.fn(),
  getTags: jest.fn(),
  getAllComments: jest.fn(),
  match,
  tags: { data: [{ id: 1, name: 'TECH' }] },
  article: { Category: { name: 'Tech' }, User: { firstName: 'Frank' } },
  readPopularArticle: jest.fn(),
  isLoading: false,
  popularArticle: [
    {
      id: 1,
      name: 'TECH'
    }
  ],
  getBookMarks: jest.fn(),
  bookmarks: []
};
localStorage.setItem('username', 'alain');
localStorage.setItem('token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkJ1cmluZGkiLCJlbWFpbCI6ImFsYWluMUBnbWFpbC5jb20ifSwiaWF0IjoxNTY4MTI4NDU5LCJleHAiOjE1NjgyMTQ4NTl9.HFugJ8jmmfF6DIuoSobH8tRXHc82Smzk71ruzjoRqpk');

const readOneArticle = shallow(<ReadArticle {...props} />);
describe('read Article component', () => {
  it('renders the Display component', () => {
    expect(readOneArticle).toBeDefined();
    expect(readOneArticle).toMatchSnapshot();
  });

  it('will receive props', () => {
    readOneArticle.setState({
      article: {},
      slug: 'why-do-we-test',
      tags: [],
      articles: [
        {
          id: 4,
          name: 'Software',
          createdAt: '2019-08-14T12:56:55.150Z',
          updatedAt: '2019-08-14T12:56:55.150Z'
        }
      ],
      isLoading: false
    });
    readOneArticle.setProps(props);
    expect(readOneArticle.instance().props).toEqual(props);
    readOneArticle.setProps({ bookmarked: true });
    expect(readOneArticle.instance().state.isLoading).toEqual(true);
  });
});

describe('test the reducers', () => {
  it('should handle the read article action result', () => {
    expect(Readreducer(initialState, {
      type: 'FETCH_ONE_ARTICLE',
      payload
    })).toEqual({
      Article: {},
      article: { ...payload }
    });
  });

  it('should handle the get tags by article action result', () => {
    expect(Readreducer(initialState, {
      type: 'GET_ARTICLE_TAGS',
      payload: tagPayload
    })).toEqual({
      Article: {},
      tags: { ...tagPayload }
    });
  });

  it('should handle the catch error feature', () => {
    expect(Readreducer(initialState, {
      type: 'READ_ARTICLE_ERROR',
      payload: errorPayload
    })).toEqual({
      Article: {},
      error: { ...errorPayload }
    });
  });
});

describe('testing the read article actions', () => {
  it('should dispatch the READ_ARTICLE action and payload', () => {
    mockAxios.get = jest.fn(() => Promise.resolve(payload));
    store.dispatch(readArticle(payload));
    expect(store.getActions()[0]).toMatchSnapshot();
  });

  it('should dispatch the READ_ARTICLE action and payload and throws an error', () => {
    const dataTest = { body: 'this is awesome' };
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: { Article: 'Article is not found' } } } }));
    store.dispatch(readArticle(dataTest));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch the GET_TAGS action and payload', () => {
    const dataTest = { body: 'this is awesome' };
    mockAxios.get = jest.fn(() => Promise.resolve(tagPayload));
    store.dispatch(getTags(dataTest));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch the GET_TAGS action and payload and throws an error', () => {
    const dataTest = { body: 'this is awesome' };
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: { tags: 'No tags found for this article' } } } }));
    store.dispatch(getTags(dataTest));
    expect(store.getActions()).toMatchSnapshot();
  });
});
