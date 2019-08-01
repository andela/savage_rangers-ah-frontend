import React from 'react';
import { shallow } from '../../enzyme';
import ForgotPassword from '../Components/PasswordReset/ForgotPassword';
import mockAxios from '../../__mocks__/axios';

const forgotPassword = shallow(<ForgotPassword />);

describe('ForgotPassword', () => {
  it('renders the ForgotPassword component', () => {
    expect(forgotPassword.find('div').exists()).toBe(true);
  });

  it('reload the state', () => {
    forgotPassword.instance().reloadState();
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

describe('Mock axios', () => {
  beforeEach((done) => {
    jest.useFakeTimers();
    done();
  });
  it('on success', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ status: 200, data: { message: 'Password reset successfully' } }));
    forgotPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });
  it('on error', () => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { email: 'incorect email' } } } }));
    forgotPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });

  it('run timers', () => {
    jest.runAllTimers();
    forgotPassword.find('form').simulate('submit', { preventDefault: () => {} });
  });
});
