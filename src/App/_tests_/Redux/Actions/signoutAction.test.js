import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import signout from '../../../../Redux/Actions/signout';
import mockAxios from '../../../../__mocks__/axios';
import types from '../../../../Redux/Actions';


const {
  SIGNOUT,
  SIGNOUT_ERROR
} = types;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const getState = {}; // initial state of the store
const store = mockStore(getState);

describe('Sigout Action', () => {
  const responseMessage = { data: { message: 'You are successfully logout' } };
  const responseError = { response: { data: 'Something went wrong during logout' } };
  test('should logout a user', async () => {
    mockAxios.get = jest.fn(() => Promise.resolve(responseMessage));
    await store.dispatch(signout());
    expect(store.getActions()[0]).toEqual({
      type: SIGNOUT,
      payload: { message: 'You are successfully logout' }
    });
  });
  test('should logout a user', async () => {
    mockAxios.get = jest.fn(() => Promise.reject(responseError));
    await store.dispatch(signout());
    expect(store.getActions()[1]).toEqual({
      type: SIGNOUT_ERROR,
      payload: 'Something went wrong during logout'
    });
  });
});
