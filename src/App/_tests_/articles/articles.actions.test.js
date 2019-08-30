import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import reducers from '../../../Redux/Reducers/articles';
import articleActions from '../../../Redux/Actions/articles';
import mockAxios from '../../../__mocks__/axios';
import article from './articles';

const { getArticles } = articleActions;
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('dispatch', () => {
  let store;
  const normalState = { articlesData: [] };
  beforeEach(() => {
    store = mockStore(normalState);
  });
  it('should dispatch action and get error', async (done) => {
    const getState = {};
    const action = { type: 'GET_ARTICLES' };
    const expectedActions = [action];
    store = mockStore(getState, expectedActions, done);
    mockAxios.get = jest.fn(() => Promise.reject({
      response: {
        data: {
          status: 404,
          errors: { ratings: 'No ratings found for this article' }
        }
      }
    }));
    await store.dispatch(getArticles());
    const actions = store.getActions();
    expect(actions[0].type).toEqual('ARTICLES_ERROR');
    done();
  });

  it('should dispatch action', async (done) => {
    const getState = {};
    const action = { type: 'GET_ARTICLES' };
    const expectedActions = [action];
    store = mockStore(getState, expectedActions, done);
    mockAxios.get = jest.fn(() => Promise.resolve({
      data: {
        result: {
          status: 200,
          pagedArticles: {
            pages: 2,
            currentPage: 1,
            pageSize: 10,
            count: 11
          },
          Articles: article.mockArticle
        },

        article: {
          slug: 'How-to-create-sequalize-seedss',
          stats: {
            reads: 0,
            shares: 0,
            comments: 0
          }
        },
        status: 404,
        errors: { ratings: 'No ratings found for this article' }
      }

    }));


    await store.dispatch(getArticles());
    const actions = store.getActions();
    expect(actions[0]).toEqual(undefined);
    done();
  });

  test('should test action on success ', () => {
    const articleData = {
      status: 200,
      pagedArticles: {
        pages: 2,
        currentPage: 1,
        pageSize: 10,
        count: 11
      },
      Articles: article.mockArticle
    };
    const state = reducers({ articlesData: { data: {} } },
      {
        type: 'GET_ARTICLES',
        articlesData: articleData
      });
    expect(state.articles).toEqual(articleData);
  });

  test('should test action on success ', () => {
    const articleDataError = {
      status: 404,
      data: 'no article found'
    };
    const state = reducers({ articlesData: { data: {} } },
      {
        type: 'ARTICLES_ERROR',
        error: articleDataError
      });
    expect(state.error[0]).toEqual(articleDataError);
  });
});
