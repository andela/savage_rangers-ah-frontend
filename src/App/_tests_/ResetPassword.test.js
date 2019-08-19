import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { PasswordReset, mapStateToProps } from '../Components/PasswordReset/ResetPassword';
import reducers from '../../Redux/Reducers';
import actions from '../../Redux/Actions/passwordReset';
import mockAxios from '../../__mocks__/axios';

const { resetPassword: action } = actions;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { data: {} };
const store = mockStore(initialState);

mapStateToProps({ passwordReset: { data: { user: {} } } });

describe('ResetPassword', () => {
  const resetPassword = shallow(<PasswordReset store={store} resetPassword={() => {}} data={{}} />);
  it('renders the ResetPassword component', () => {
    expect(resetPassword.find('div').exists()).toBe(true);
  });
});

describe('reducers', () => {
  let state;
  it('On error', () => {
    state = reducers({ testRedux: { data: {} }, passwordReset: { data: {}, errorMessage: 'empty' } },
      { type: 'CATCH_ERROR', payload: 'Invalid password provided' });
    expect(state).toEqual({
      testRedux: { data: {} },
      authReducer: {
        isAuthorized: false,
        isFetching: false
      },
      passwordReset: { data: {}, errorMessage: 'Invalid password provided' },
      registration: {
        data: {},
        error: undefined
      }
    });
  });

  it('renders the ResetPassword component', () => {
    state = reducers({ testRedux: { data: {} }, passwordReset: { data: {}, errorMessage: 'empty' } },
      {
        type: 'RESET_PASSWORD',
        payload: {
          status: 200,
          message: 'Password reset successfully',
          user: {
            id: 43,
            username: 'Prémices Tuvere',
            email: 'premices.tuvere@gmail.com',
            password: null,
            country: null,
            firstName: null,
            lastName: null,
            bio: null,
            address: null,
            gender: null,
            profileImage:
              'https://lh6.googleusercontent.com/-lvsvS3f8ZBU/AAAAAAAAAAI/AAAAAAAAAHM/btx70ydkt2I/photo.jpg',
            phoneNumber: null,
            provider: 'google',
            uniqueId: '109534897854342862346',
            verified: false,
            facebook: null,
            twitter: null,
            role: 'normal',
            isBlocked: false,
            createdAt: '2019-08-14T09:37:54.802Z',
            updatedAt: '2019-08-14T09:37:54.802Z'
          },
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MywidXNlcm5hbWUiOiJQcsOpbWljZXMgVHV2ZXJlIiwiZW1haWwiOiJwcmVtaWNlcy50dXZlcmVAZ21haWwuY29tIn0sImlhdCI6MTU2NTc3NzMxNCwiZXhwIjoxNTY1ODYzNzE0fQ.eFPAsEvNALOjznlBPXRVZ-cPMAkWkAWPoKIDJmlqiBM'
        }
      });
    expect(state).toEqual({
      testRedux: { data: {} },
      registration: { data: {} },
      authReducer: {
        isAuthorized: false,
        isFetching: false
      },
      passwordReset: {
        data: {
          status: 200,
          message: 'Password reset successfully',
          user: {
            id: 43,
            username: 'Prémices Tuvere',
            email: 'premices.tuvere@gmail.com',
            password: null,
            country: null,
            firstName: null,
            lastName: null,
            bio: null,
            address: null,
            gender: null,
            profileImage:
              'https://lh6.googleusercontent.com/-lvsvS3f8ZBU/AAAAAAAAAAI/AAAAAAAAAHM/btx70ydkt2I/photo.jpg',
            phoneNumber: null,
            provider: 'google',
            uniqueId: '109534897854342862346',
            verified: false,
            facebook: null,
            twitter: null,
            role: 'normal',
            isBlocked: false,
            createdAt: '2019-08-14T09:37:54.802Z',
            updatedAt: '2019-08-14T09:37:54.802Z'
          },
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MywidXNlcm5hbWUiOiJQcsOpbWljZXMgVHV2ZXJlIiwiZW1haWwiOiJwcmVtaWNlcy50dXZlcmVAZ21haWwuY29tIn0sImlhdCI6MTU2NTc3NzMxNCwiZXhwIjoxNTY1ODYzNzE0fQ.eFPAsEvNALOjznlBPXRVZ-cPMAkWkAWPoKIDJmlqiBM'
        },
        errorMessage: 'empty'
      }
    });
  });
});

describe('Action', () => {
  it('on success', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ status: 200, data: { message: 'Password reset successfully' } }));
    store.dispatch(action('123passworD'));
  });

  it('on error', () => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { email: 'incorrect password' } } } }));
    store.dispatch(action('1234passworD'));
  });
});

describe('Simulations', () => {
  const resetPassword = shallow(<PasswordReset store={store} resetPassword={() => {}} data={{}} />);
  it('Should simulate the filling', () => {
    resetPassword.find('#newPassword').simulate('change', {
      target: {
        name: 'newPassword',
        value: 'abc'
      }
    });
    resetPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });

  it('Should simulate the filling', () => {
    resetPassword.find('#newPassword').simulate('change', {
      target: {
        name: 'newPassword',
        value: 'abcABCDSS789'
      }
    });

    resetPassword.find('#confirmPassword').simulate('change', {
      target: {
        name: 'confirmPassword',
        value: 'abcABCDSS789'
      }
    });

    resetPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });

  it('Should simulate props', () => {
    resetPassword.instance().componentWillReceiveProps({ data: {}, errorMessage: '' });
  });

  it('Should simulate the state', () => {
    resetPassword.setState({ success: true });
  });

  it('Should simulate props', () => {
    resetPassword
      .instance()
      .componentWillReceiveProps({ data: { token: '', message: 'message' }, errorMessage: '' });
  });
});
