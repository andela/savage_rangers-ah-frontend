import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { ForgotPassword, mapStateToProps } from '../Components/PasswordReset/ForgotPassword';
import reducer from '../../Redux/Reducers/passwordReset';
import actions from '../../Redux/Actions/passwordReset';
import mockAxios from '../../__mocks__/axios';

const { sendEmail } = actions;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { data: {} };
const store = mockStore(initialState);
mapStateToProps({ passwordReset: { data: { user: {} } } });

describe('ForgotPassword', () => {
  const forgotPassword = shallow(<ForgotPassword store={store} sendEmail={() => {}} data={{}} errorMessage="message" />);
  it('renders the ForgotPassword component', () => {
    expect(forgotPassword.find('div').exists()).toBe(true);
  });

  it('Simulates the filling of the fields', () => {
    forgotPassword.find('input').simulate('change', {
      target: {
        name: 'email',
        value: 'email.app@domain.com'
      }
    });
  });
});

describe('reducers', () => {
  let state;
  // it('Before fetching', () => {
  //   state = reducers(undefined, {});
  //   expect(state).toEqual({
  //     testRedux: { data: {} },
  //     passwordReset: { data: {}, errorMessage: 'empty' },
  //     registration: { data: {} }
  //   });
  // });

  it('On error', () => {
    state = reducer({ data: {}, errorMessage: 'empty' },
      { type: 'CATCH_ERROR', payload: "A user with the provided email doesn't exist" });
    expect(state).toEqual({
      data: {},
      errorMessage: "A user with the provided email doesn't exist"
    });
  });
  it('On success', () => {
    state = reducer({ data: {}, errorMessage: "A user with the provided email doesn't exist" },
      {
        type: 'SEND_RESET_PASSWORD_EMAIL',
        payload: {
          status: 200,
          message:
            "Password reset instructions have been sent to your account's primary email address. Please check the spam if you don't see the email"
        }
      });
    expect(state).toEqual({
      data: {
        status: 200,
        message:
          "Password reset instructions have been sent to your account's primary email address. Please check the spam if you don't see the email"
      },
      errorMessage: "A user with the provided email doesn't exist"
    });
  });
});

describe('Action', () => {
  it('on success', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ status: 200, data: { message: 'Success' } }));
    store.dispatch(sendEmail('email@something.com'));
  });
  it('on error', () => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { email: 'incorrect password' } } } }));
    store.dispatch(sendEmail('email@something.com'));
  });
});

describe('Simulations', () => {
  const forgotPassword = shallow(<ForgotPassword store={store} sendEmail={() => {}} data={{}} errorMessage="message" />);
  it('Should simulate the filling', () => {
    forgotPassword.find('#email').simulate('change', {
      target: {
        name: 'email',
        value: 'email@something.com'
      }
    });
    forgotPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });
  it('Should simulate the filling', () => {
    forgotPassword.find('#email').simulate('change', {
      target: {
        name: 'email',
        value: 'email'
      }
    });
    forgotPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });

  it('Should simulate props', () => {
    forgotPassword.instance().componentWillReceiveProps({ data: {} });
    forgotPassword
      .instance()
      .componentWillReceiveProps({ data: { email: '', message: 'message' } });
  });
});
