import authReducer, { initialState } from '../../Redux/Reducers/auth';
import { LOGIN_FAILED, FETCHING, LOGIN_SUCCESS } from '../../Redux/Actions/types';

const user = {
  email: 'alain1@gmail.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…0MjF9.wOUqxLXXSMbmoAmX_r6eKseGOxcAi7dibj8NN6Kx8D4',
  username: 'Burindi'
};
describe('TESTING REDUCERS', () => {
  describe('Test auth reducers', () => {
    it('should return the initialState', () => {
      expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should reduce the LOGIN_FAILED', () => {
      const results = authReducer({ ...initialState },
        { type: LOGIN_FAILED, payload: { error: 'Login failed' } });
      expect(results).toHaveProperty('error', 'Login failed');
    });

    it('should reduce the FETCHING', () => {
      const res = authReducer(undefined, { type: FETCHING });
      expect(res).toHaveProperty('isFetching', true);
    });

    it('should reduce the LOGIN_SUCCESS', () => {
      const res = authReducer({ ...initialState },
        { type: LOGIN_SUCCESS, payload: { user, message: 'Login successful' } });
      expect(res).toHaveProperty('isFetching', false);
      expect(res).toHaveProperty('user', user);
    });
  });
});
