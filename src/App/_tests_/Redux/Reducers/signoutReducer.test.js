import signoutReducer from '../../../../Redux/Reducers/signoutReducer';
import types from '../../../../Redux/Actions';

const { SIGNOUT, SIGNOUT_ERROR } = types;

describe('Signout Reducers', () => {
  test('should logout', () => {
    const signoutOp = signoutReducer({},
      { type: SIGNOUT, payload: { message: 'successfully logged out' } });
    expect(signoutOp).toEqual({ logout: { message: 'successfully logged out' } });
  });

  test('should return a messed when it fails to logout', () => {
    const signoutOp = signoutReducer({},
      {
        type: SIGNOUT_ERROR,
        payload: { message: 'Something went long during logout process' }
      });
    expect(signoutOp).toEqual({ logoutError: { message: 'Something went long during logout process' } });
  });
});
