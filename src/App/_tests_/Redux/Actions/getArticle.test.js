import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getArticleActions from '../../../../Redux/Actions/getArticle';
import mockAxios from '../../../../__mocks__/axios';

const { getArticleDetail, getArticleTags } = getArticleActions;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const getState = {}; // initial state of the store
const store = mockStore(getState);
describe('get article actions', () => {
  const expectedData = {
    status: 200,
    article: { body: 'its great to TDD' }
  };
  test('get article detail', async () => {
    mockAxios.get = jest.fn(() => Promise.resolve(expectedData));
    await store.dispatch(getArticleDetail('the-power-of-attitude-inoculation-533wzmg41v'));
    console.log(store.getActions());
  });
});
