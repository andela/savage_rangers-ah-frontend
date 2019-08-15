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
    coverImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565787533/rvkmbae3pcqhgysxoqnk.jpg',
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
      profileImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565805494/nenxg6yetjfgbk96iq8l.jpg'
    }
  }
};

mapStateToProps({ readArticle: {} });
const match = { params: { slug: 'slug' } };
const props = {
  readArticle: jest.fn(), getTags: jest.fn(), match, tags: { data: [{ id: 1, name: 'TECH' }] }, article: { Category: { name: 'Tech' }, User: { firstName: 'Frank' } }
};
const display = shallow(<ReadArticle {...props} />);
describe('Display', () => {
  it('renders the Display component', () => {
    expect(display).toBeDefined();
    expect(display.find('div').exists()).toBe(true);
    expect(display).toMatchSnapshot();
  });

  it('should receive the props', () => {
    display.setState({ article: {}, tags: [], isBookmarked: true });
    display.setProps(props);
    expect(display.instance().props).toEqual(props);
    expect(display.instance().state).toEqual({
      article: {}, body: undefined, category: 'Tech', coverImage: undefined, createdAt: undefined, firstName: 'Frank', isBookmarked: true, lastName: undefined, profileImage: undefined, readTime: undefined, slug: undefined, tags: [{ id: 1, name: 'TECH' }], title: undefined
    });
  });
});

describe('test the reducers', () => {
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
  it('should handle the read article action result', () => {
    expect(Readreducer(initialState, {
      type: 'READ_ARTICLE',
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
});

describe('testing the actions', () => {
  it('should check the read article action on failure', () => {
    const dataTest = { body: 'this is not awesome' };
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: {} } } }));
    store.dispatch(readArticle(dataTest));
    expect(store.getActions()[0]).toBe(undefined);
  });

  it('should check the get article tags action on failure', () => {
    const dataTest = { body: 'this is awesome' };
    mockAxios.get = jest.fn(() => Promise.reject({ response: { data: { errors: {} } } }));
    store.dispatch(getTags(dataTest));
    expect(store.getActions()[0].type).toEqual('CATCH_ERROR');
  });
});
