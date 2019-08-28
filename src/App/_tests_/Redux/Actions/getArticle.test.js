import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getArticleActions from '../../../../Redux/Actions/getArticle';
import mockAxios from '../../../../__mocks__/axios';
import types from '../../../../Redux/Actions';

const {
  getArticleDetail,
  getArticleTags,
  getDraftedArticle
} = getArticleActions;
const {
  GET_ARTICLE,
  GET_ARTICLE_TAGS,
  GET_DRAFTED_ARTICLE,
  ARTICLE_NOT_FOUND,
  ARTICLE_TAGS_NOT_FOUND
} = types;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const getState = {}; // initial state of the store
const store = mockStore(getState);
describe('get article actions', () => {
  const expectedData = {
    data: {
      status: 200,
      article: {
        body: 'its great to TDD',
        status: 'published'
      }
    }
  };
  const expectedDraft = {
    data: {
      status: 200,
      article: {
        body: 'Let publish me',
        status: 'draft'
      }
    }
  };
  const articleTags = { data: { tags: ['jest', 'fn'] } };
  const draftErrorInfo = {
    response: {
      data: {
        errors: {
          status: 404,
          slug: 'article not Found'
        }
      }
    }
  };
  const articleErrorInfo = {
    response: {
      data: {
        errors: {
          status: 404,
          Article: 'article not Found'
        }
      }
    }
  };

  const tagErrorInfo = {
    response: {
      data: {
        errors: {
          status: 404,
          message: 'Tags not Found'
        }
      }
    }
  };

  test('get article detail', async () => {
    mockAxios.get = jest.fn(() => Promise.resolve(expectedData));
    await store.dispatch(getArticleDetail('the-power-of-attitude-inoculation-533wzmg41v'));
    expect(store.getActions()[0]).toEqual({
      type: GET_ARTICLE,
      payload: { body: 'its great to TDD', status: 'published' }
    });
  });

  test('reject article detail request', async () => {
    mockAxios.get = jest.fn(() => Promise.reject(articleErrorInfo));
    await store.dispatch(getArticleDetail('the-power-of-attitude-inoculation-533wzmg41v'));
  });

  test('get drafted article detail', async () => {
    mockAxios.get = jest.fn(() => Promise.resolve(expectedDraft));
    await store.dispatch(getDraftedArticle('the-power-of-attitude-inoculation-533wzmg41v'));
    expect(store.getActions()[2]).toEqual({
      type: GET_DRAFTED_ARTICLE,
      payload: {
        body: 'Let publish me',
        status: 'draft'
      }
    });
  });
  test('reject article tag request', async () => {
    mockAxios.get = jest.fn(() => Promise.reject(tagErrorInfo));
    await store.dispatch(getArticleTags('the-power-of-attitude-inoculation-533wzmg41v'));
  });

  test('get article detail', async () => {
    mockAxios.get = jest.fn(() => Promise.resolve(articleTags));
    await store.dispatch(getArticleTags('the-power-of-attitude-inoculation-533wzmg41v'));
    expect(store.getActions()[4]).toEqual({
      type: GET_ARTICLE_TAGS,
      payload: { tags: ['jest', 'fn'] }
    });
  });
  test('reject drafted article request', async () => {
    mockAxios.get = jest.fn(() => Promise.reject(draftErrorInfo));
    await store.dispatch(getDraftedArticle('the-power-of-attitude-inoculation-533wzmg41v'));
  });

  test('Testing all rejected requests', () => {
    expect(store.getActions()[5]).toEqual({
      type: ARTICLE_NOT_FOUND,
      payload: 'article not Found'
    });
    expect(store.getActions()[3]).toEqual({
      type: ARTICLE_TAGS_NOT_FOUND,
      payload: { status: 404, message: 'Tags not Found' }
    });
  });
});
