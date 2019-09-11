import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import reducers from '../../../Redux/Reducers/searchArticle';
import searchActions from '../../../Redux/Actions/searchArticle';
import mockAxios from '../../../__mocks__/axios';
import article from './articles';

const { searchArticles } = searchActions;
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('dispatch', () => {
  let store;
  const normalState = { searchData: [] };
  beforeEach(() => {
    store = mockStore(normalState);
  });
  it('should dispatch action and get error', async (done) => {
    const getState = {};
    const action = { type: 'SEARCH_ARTICLE' };
    const expectedActions = [action];
    store = mockStore(getState, expectedActions, done);
    mockAxios.get = jest.fn(() => Promise.reject({
      response: {
        data: {
          errors: { ratings: 'No ratings found for this article' },
          status: 404
        }
      }
    }));
    await store.dispatch(searchArticles());
    store.getActions();
    done();
  });

  it('should dispatch search article action', async (done) => {
    const getState = {};
    const action = { type: 'SEARCH_ARTICLE' };
    const expectedActions = [action];
    store = mockStore(getState, expectedActions, done);
    mockAxios.get = jest.fn(() => Promise.resolve({
      data: {
        paginationDetails: {
          pages: 2,
          currentPage: 1,
          pageSize: 10,
          count: 11
        },
        articles: {
          status: 200,
          rows: article.Search
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
    await store.dispatch(searchArticles());
    store.getActions();
    expect(action.type).toEqual('SEARCH_ARTICLE');
    done();
  });

  test('should test reducer on success ', () => {
    const searchData = {
      status: 200,
      pagedArticles: {
        pages: 2,
        currentPage: 1,
        pageSize: 10,
        count: 11
      },
      Articles: article.Search
    };
    const state = reducers({ searchData: { data: { searchData } } },
      {
        type: 'SEARCH_ARTICLE',
        searchData: article.Search
      });
    expect(state.searchData.data.searchData.searchData).toEqual(searchData.searchData);
  });

  test('should test reducer on error ', () => {
    const searchDataError = {
      status: 404,
      data: 'no article found'
    };
    const state = reducers({ searchData: { data: { searchDataError } } },
      {
        type: 'SEARCH_ERROR',
        error: searchDataError
      });
    expect(state.searchData.data.searchDataError).toEqual(searchDataError);
  });
});
