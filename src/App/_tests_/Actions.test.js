import mockAxios from 'axios';
import thunk from 'redux-thunk';
import React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import reducers from '../../Redux/Reducers/testReduxReducer';
import testReduxActions from '../../Redux/Actions/testReduxActions';
import { shallow } from '../../enzyme';
import { TestRedux as TestReduxComponent, mapStateToProps } from '../Components/TestRedux';

const { getWelcome } = testReduxActions;

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('Component', () => {
  let wrapper;
  const get = jest.fn(() => {});

  const props = {
    // Your props goes here..
    getWelcome: get
  };
  const initialState = { testRedux: {} };
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('should render the component and call mapStateToProps', (done) => {
    wrapper = shallow(<TestReduxComponent store={store} {...props} data />);
    wrapper = shallow(<TestReduxComponent store={store} {...props} />);
    const instance = wrapper.instance();
    expect(instance.props.getWelcome).toHaveBeenCalledTimes(2);
    // For the `mapDispatchToProps`, call it directly but pass in
    // a mock function and check the arguments passed in are as expected
    mapStateToProps({ testRedux: { data: {} } });
    done();
  });
});

it('should dispatch action', async (done) => {
  const getState = {}; // initial state of the store
  const action = { type: 'GET_WELCOME' };
  const expectedActions = [action];
  const store = mockStore(getState, expectedActions, done);
  store.dispatch(action);
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 1, name: 'Vasilis' }] }));
  await store.dispatch(getWelcome());
  const actions = store.getActions();
  expect(actions[0].type).toEqual('GET_WELCOME');
  done();
});

test('reducers', () => {
  const state = reducers({ testRedux: { data: {} } },
    {
      type: 'GET_WELCOME',
      payload: { status: 200, data: { message: 'Welcome to Authors Haven' } }
    });
  expect(state).toEqual({
    testRedux: { data: {} },
    data: { message: 'Welcome to Authors Haven' }
  });
});
