import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import login from '../../../Redux/Actions/auth';
import { FETCHING, LOGIN_FAILED, LOGIN_SUCCESS } from '../../../Redux/Actions/types';

const mockStore = configureMockStore([thunk]);
let store;

const response = {
  user: {
    email: 'alain1@gmail.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    username: 'Burindi'
  },
  message: 'Login successful'
};

describe("Testing developers' action creators", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  describe('Test login actions', () => {
    it('should dispatch login success action', async () => {
      const expectedActions = [{ type: FETCHING }, { type: LOGIN_SUCCESS, payload: response }];
      mockAxios.post = jest.fn(() => Promise.resolve({ status: 200, data: { ...response } }));
      store.dispatch(login({ Email: 'alain1@gmail.com', Password: 'password23423' })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch login failed action', async () => {
      const expectedActions = [
        { type: FETCHING },
        { type: LOGIN_FAILED, payload: { errors: { error: 'Invalid email or password' } } }
      ];
      mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { error: 'Invalid email or password' } } } }));
      store.dispatch(login({ Email: 'dianefdhj@gmail.com', Password: 'fbhjbhj' })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
