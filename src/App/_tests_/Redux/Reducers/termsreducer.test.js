import termsReducer from '../../../../Redux/Reducers/termsAndcondReducers';
import actions from '../../../../Redux/Actions';

describe('TERMS Reducer', () => {
  it('FETCH_TERMS_SUCCESS reducer', () => {
    const initialState = { termsAndConditions: '' };
    expect(termsReducer(initialState, {
      type: actions.FETCH_TERMS,
      payload: {
        termsAndConditions:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    })).toEqual({
      termsAndConditions:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });
  });
});
