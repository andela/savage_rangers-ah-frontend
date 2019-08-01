import React from 'react';
import { shallow } from '../../enzyme';
import ResetPassword from '../Components/PasswordReset/ResetPassword';
import mockAxios from '../../__mocks__/axios';

const resetPassword = shallow(<ResetPassword />);

describe('ResetPassword', () => {
  it('renders the ResetPassword component', () => {
    expect(resetPassword.find('div').exists()).toBe(true);
  });
});

describe('Mock axios', () => {
  beforeEach((done) => {
    jest.useFakeTimers();
    done();
  });
  it('on success', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ status: 200, data: { message: 'Password reset successfully' } }));
    resetPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });
  it('on error', () => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { email: 'incorect email' } } } }));
    resetPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });

  it('run timers', () => {
    jest.runAllTimers();
    resetPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });
});

describe('Simulations', () => {
  it('Should simulate the filling', () => {
    resetPassword.find('#newPassword').simulate('change', {
      target: {
        name: 'newPassword',
        value: 'abc'
      }
    });
    resetPassword.find('form').simulate('change', { preventDefault: () => {} });
  });

  it('should change the state', () => {
    resetPassword.setState({
      newPassword: 'newPassword',
      confirmPassword: '',
      success: false,
      error: false,
      errorMessage: ''
    });
    resetPassword.instance().onSubmit({ preventDefault: () => {} });
  });
});
