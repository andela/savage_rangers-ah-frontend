import mockAxios from 'axios';
import thunk from 'redux-thunk';
import React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import reducers from '../../Redux/Reducers/Registration';
import registerActions from '../../Redux/Actions/Registration';
import { shallow } from '../../enzyme';
import { Registration, mapStateToProps } from '../Components/Registration/Registration';

const { register } = registerActions;
const history = { push: jest.fn() };

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
let wrapper;
const getState = {}; // initial state of the store
const store = mockStore(getState);
const props = { register, history };

describe('Test registration', () => {
  wrapper = shallow(<Registration store={store} {...props} />);
  wrapper.setProps({ error: 'not found' });
  wrapper.setProps({ message: 'created' });
  wrapper.setProps({ user: { username: 'alain' } });
  it('use frontend validation', (done) => {
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(wrapper.find('.text-danger').exists()).toBe(true);
    done();
  });
  test('Component', () => {
    // simulate changes
    wrapper.find('input[type="text"]').simulate('change', {
      preventDefault: () => {},
      target: { name: 'username', value: 'alain' }
    });
    expect(wrapper.state('username')).toEqual('alain');

    wrapper.find('input[type="email"]').simulate('change', {
      preventDefault: () => {},
      target: { name: 'email', value: 'alain@gmail.com' }
    });
    expect(wrapper.state('email')).toEqual('alain@gmail.com');

    wrapper
      .find('input[type="password"]')
      .at(0)
      .simulate('change', {
        preventDefault: () => {},
        target: { name: 'password', value: 'krishankant123' }
      });
    expect(wrapper.state('password')).toEqual('krishankant123');

    wrapper
      .find('input[type="password"]')
      .at(1)
      .simulate('change', {
        preventDefault: () => {},
        target: { name: 'confirmPassword', value: 'krishankant123' }
      });
    expect(wrapper.state('confirmPassword')).toEqual('krishankant123');

    wrapper.find('input[type="checkbox"]').simulate('change', {
      preventDefault: () => {},
      target: { type: 'checkbox', checked: true }
    });
    expect(wrapper.state('accepted')).toEqual(true);

    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    mapStateToProps({ registration: { user: { username: 'alain' }, error: 'not found' } });
  });

  it('returns the password error', (done) => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { message: 'password is required' } } }));
    const expectedAction = {
      type: 'CATCH_ERROR',
      payload: { message: 'password is required' }
    };
    const testData = { email: 'test1@test.com' };
    store.dispatch(register(testData)).then(() => {
      const actualAction = store.getActions()[0];
      expect(actualAction).toEqual(expectedAction);
    });
    done();
  });

  it('returns the incorrect email error', (done) => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { email: 'incorect email' } } } }));
    const expectedAction = { type: 'CATCH_ERROR', payload: { message: 'incorect email' } };
    const testData = { email: 'test1@test.com', password: '1234' };
    store.dispatch(register(testData)).then(() => {
      const actualAction = store.getActions()[1];
      expect(actualAction).toEqual(expectedAction);
    });
    done();
  });

  it('returns a token on success', (done) => {
    mockAxios.post = jest.fn(() => Promise.reject({ response: { status: 400, data: { errors: { username: 'incorect username' } } } }));
    const expectedAction = { type: 'CATCH_ERROR', payload: { message: 'incorect username' } };
    const testData = { email: 'test1@test.com', password: '1234' };
    store.dispatch(register(testData)).then(() => {
      const actualAction = store.getActions()[2];
      expect(actualAction).toEqual(expectedAction);
    });
    done();
  });

  it('returns a token on success', async (done) => {
    mockAxios.post = jest.fn(() => Promise.resolve({ status: 201, data: { user: { token: 'sample_token' } } }));

    const expectedAction = { type: 'REGISTER', payload: { token: 'sample_token' } };

    const testData = { email: 'test1@test.com', password: '1234' };
    store
      .dispatch(register(testData))
      .then(() => {
        const actualAction = store.getActions()[3];
        expect(actualAction).toEqual(expectedAction);
      })
      .catch(() => jest.fn());
    done();
  });

  test('reducers', () => {
    const state = reducers({ registration: {} },
      {
        type: 'CATCH_ERROR',
        payload: { message: 'The username should only contain alphanumeric characters' }
      });
    expect(state).toEqual({
      registration: {},
      error: 'The username should only contain alphanumeric characters'
    });
  });

  test('reducers', () => {
    const state = reducers({ registration: {} },
      {
        type: 'REGISTER',
        payload: 'account created'
      });
    expect(state).toEqual({ registration: {}, message: 'account created', error: '' });
  });
});
