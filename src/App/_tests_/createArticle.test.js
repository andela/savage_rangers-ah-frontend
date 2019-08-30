import React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockAxios from 'axios';
import { shallow } from '../../enzyme';
import { CreateArticle } from '../Components/CreateArticle/CreateArticle';
import tags from '../../__mocks__/tags';
import { createArticle as createReducer } from '../../Redux/Reducers/createArticle';
import types from '../../Redux/Actions';
import {
  createArticle as firstDraft,
  drafting,
  publish as publishAction,
  changeState
} from '../../Redux/Actions/articles';

const props = {
  categories: jest.fn(),
  tags,
  initialState: null,
  changeState: jest.fn(),
  getTags: jest.fn(),
  imageUploder: jest.fn(() => Promise.resolve('http://localhost/jpeg.jpg')),
  publish: jest.fn(() => Promise.resolve('article updated successfully')),
  getCategories: jest.fn(),
  getArticleDetail: jest.fn(),
  getArticleTags: jest.fn()
};

const {
  GET_TAGS,
  GET_CATEGORIES,
  CREATE_ARTICLE,
  AUTO_SAVE,
  PUBLISH_ARTICLE,
  CREATE_ARTICLE_ERROR
} = types;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const getState = {}; // initial state of the store
const store = mockStore(getState);

describe('Create article', () => {
  const routeParam = { match: { params: { slug: 'let me see' } } };

  const Create = shallow(<CreateArticle
    {...props}
    {...routeParam}
  />);
  test('should update the title', () => {
    Create.setState({ isLoading: false });
    Create.find('#title').simulate('change', { target: { name: 'title', value: 'test title' } });
    expect(Create.state().article.title).toEqual('test title');
  });
  test('should update the description', () => {
    Create.find('#description').simulate('change', { target: { name: 'description', value: 'test description' } });
    expect(Create.state().article.description).toEqual('test description');
  });
  test('should update the image', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ data: { secure_url: 'http://jpeg.jpeg' } }));
    const fileimage = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    Create.find('#cover-image').simulate('change', { target: { files: [fileimage] } });
  });
  test('should update the body of the article', () => {
    Create.instance().addArticleToState('jest test');
    expect(Create.state().article.body).toEqual('jest test');
  });
  test('should update the article tags', () => {
    Create.instance().addTags(['jest']);
    expect(Create.state().article.tags.length).toEqual(1);
  });

  test('should add category id to state', () => {
    Create.find('select').simulate('change', { target: { id: 1, name: 'category', value: '1' } });
    expect(Create.state().article.category).toEqual(1);
  });
  test('should add category id to state', () => {
    Create.setState({ categories: [{ id: 1, name: 'love' }, { id: 2, name: 'kiss' }] });
    expect(Create.find('#category-1').exists()).toBe(true);
  });
  test('should update props', () => {
    Create.instance().componentWillReceiveProps({
      listOfCategories: [{ id: 1, name: 'jest' }],
      listOfTags: [{ id: 1, name: 'fn' }]
    });
    expect(...Create.state().categories).toEqual({ id: 1, name: 'jest' });
    expect(...Create.state().tags).toEqual({ id: 1, name: 'fn' });
  });
  test('should publish article', () => {
    Create.find('#published').simulate('click');
    Create.setState({ published: true });
    expect(Create.find('Redirect').exists()).toBe(true);
  });
});

describe('Reducers', () => {
  test('create article reducer', () => {
    const create = createReducer({},
      { type: CREATE_ARTICLE, payload: { body: 'Greate article comming up' } });

    expect(create).toEqual({ createdArticle: { body: 'Greate article comming up' } });
  });
  test('autoSave reducer', () => {
    const autoSave = createReducer({},
      {
        type: AUTO_SAVE,
        payload: { body: 'Great article comming up', tags: ['jest'] }
      });
    expect(autoSave).toEqual({
      updatedArticle: {
        body: 'Great article comming up',
        tags: ['jest']
      }
    });
  });
  test('getCategories reducer', () => {
    const categoriesReducer = createReducer({},
      {
        type: GET_CATEGORIES,
        payload: { categories: ['jest', 'fn'] }
      });
    expect(categoriesReducer).toEqual({ categories: { categories: ['jest', 'fn'] } });
  });
  test('getTags reducer', () => {
    const tagsReducer = createReducer({},
      {
        type: GET_TAGS,
        payload: { tags: ['jest', 'fn'] }
      });
    expect(tagsReducer).toEqual({ tags: { tags: ['jest', 'fn'] } });
  });
  test('CreateArticleError reducer', () => {
    const error = createReducer({},
      {
        type: CREATE_ARTICLE_ERROR,
        payload: 'Ooops...failed to create article'
      });
    expect(error).toEqual({ error: 'Ooops...failed to create article' });
  });
  test('Publish article reducer', () => {
    const message = createReducer({},
      { type: PUBLISH_ARTICLE, payload: 'Article updated successfully' });
    expect(message).toEqual({ message: 'Article updated successfully' });
  });
});

describe('Actions', () => {
  test('create first draft', () => {
    const expectedData = {
      data: {
        status: 201,
        message: 'Article Created successfully',
        article: { body: 'Can i get an Amen' }
      }
    };
    const testData = { body: 'Can i get an Amen' };
    mockAxios.post = jest.fn(() => Promise.resolve(expectedData));
    store
      .dispatch(firstDraft(testData))
      .then(() => {
        expect(store.getActions()[0].payload).toEqual(expectedData);
      })
      .catch(() => jest.fn());
  });
  test('create first draft', () => {
    const expectedData = {
      data: {
        status: 400,
        message: 'Bad Request'
      }
    };
    const testData = { body: 'Can i get an Amen' };
    mockAxios.post = jest.fn(() => Promise.reject(expectedData));
    store
      .dispatch(firstDraft(testData))
      .then(() => {
        expect(store.getActions()[0].payload).toEqual(expectedData);
      })
      .catch(() => jest.fn());
  });
  test('Drafting', () => {
    const expectedData = { message: 'Article updated successfully' };
    const testData = { body: 'Can i get an Amen' };
    mockAxios.patch = jest.fn(() => Promise.resolve(expectedData));
    store
      .dispatch(drafting(testData))
      .then(() => {
        expect(store.getActions()[0].payload).toEqual(expectedData);
      })
      .catch(() => jest.fn());
  });

  test('Publish', () => {
    const expectedData = { message: 'Article Published successfully' };
    const testData = { body: 'Can i get an Amen' };
    mockAxios.patch = jest.fn(() => Promise.resolve(expectedData));
    store
      .dispatch(publishAction(testData))
      .then(() => {
        expect(store.getActions()[0].payload).toEqual(expectedData);
      })
      .catch(() => jest.fn());
  });

  test('ChangeState', () => {
    store.dispatch(changeState('hello world'));
    expect(store.getActions()[3]).toEqual({
      type: 'CHANGE_STATE',
      payload: 'hello world'
    });
  });
});
