import React from 'react';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Notifications, mapStateToProps } from '../Components/Notifications/Notifications';
import reducer from '../../Redux/Reducers/notifications';
import mockAxios from '../../configs/axios';
import actions from '../../Redux/Actions/notifications';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  notifications: { data: {}, configs: { config: { isShown: true } }, profile: { id: 1 } },
  authReducer: { user: {} },
  get: jest.fn(),
  getConfigs: jest.fn(),
  getProfile: jest.fn()
};
const store = mockStore(initialState);

mapStateToProps(initialState);

document.body.innerHTML = `<div> 
 <div class="notifications-container"> </div>
 <div class="space-notifications"> </div>
 <input type="checkbox" id="get-notifications" />
 <div id="notifications" ></div>
 <div id="notifications-triangle" ></div>
 <div class="notify-bubble" ></div>
</div>`;

const notifications = shallow(<Notifications
  store={store}
  get={jest.fn()}
  getProfile={jest.fn()}
  getConfigs={jest.fn()}
  snooze={jest.fn()}
  markAsRead={() => Promise.resolve({})}
  markAllAsRead={() => Promise.resolve({})}
/>);

describe('notifications', () => {
  it('renders the notifications component', () => {
    // When there are notifications to display
    localStorage.setItem('token', 'token');
    notifications.setState({
      notifications: [
        {
          id: 1,
          message: 'message',
          url: 'url/url'
        }
      ],
      isSnoozed: false
    });

    // Providing props to the component
    notifications
      .instance()
      .componentWillReceiveProps({ data: { data: [] }, configs: { config: { isSnoozed: false } } });
    notifications.instance().render();
    expect(notifications.find('p').text()).toEqual('Notifications');

    notifications
      .instance()
      .componentWillReceiveProps({ configs: { config: { isSnoozed: true } } });
    notifications.instance().render();
    expect(notifications.find('p').text()).toEqual('Notifications');

    notifications.instance().componentWillReceiveProps({ data: { data: [] } });
    notifications.instance().render();

    // Last state of the component
    notifications.setState({ isSnoozed: true });
    notifications.instance().componentDidMount();

    // Expecting the component to have mounted
    expect(notifications.find('p').text()).toEqual('Notifications');
  });

  it('Should snooze ', () => {
    notifications.setState({
      notifications: [
        {
          id: 1,
          message: 'message',
          url: 'url/url'
        }
      ],
      isSnoozed: false
    });
    notifications.instance().snooze();
    notifications.setState({ isSnoozed: true });
    notifications.instance().snooze();
    expect(notifications.find('p').text()).toEqual('Notifications');
  });

  it('Should render when there are not notifications', () => {
    notifications.setState({
      notifications: [],
      isSnoozed: true
    });
    notifications.instance().snooze();
    expect(notifications.find('p').text()).toEqual('Notifications');
  });

  it('Should mark notifications as read', () => {
    notifications.instance().markAsRead();
    notifications.instance().markAllAsRead();
    expect(store.getState().notifications.data).toEqual({});
  });
});

describe('Reducers', () => {
  let state;
  test('get configs', () => {
    state = reducer({ isShown: false, data: {}, errorMessage: '' },
      {
        type: 'GET_NOTIFICATIONS_CONFIGS',
        payload: {
          status: 200,
          config: {
            id: 1,
            userId: 1,
            config: {
              inApp: {
                articles: { show: true, on: ['report', 'block'] },
                comments: { show: true, on: ['report', 'block'] }
              },
              email: {
                articles: { show: true, on: ['report', 'block'] },
                comments: { show: true, on: ['report', 'block'] }
              }
            },
            isSnoozed: true,
            createdAt: '2019-08-14T12:48:02.826Z',
            updatedAt: '2019-08-18T20:33:22.295Z'
          }
        }
      });
    expect(state).toEqual({
      isShown: false,
      data: {},
      errorMessage: '',
      configs: {
        status: 200,
        config: {
          id: 1,
          userId: 1,
          config: {
            inApp: {
              articles: { show: true, on: ['report', 'block'] },
              comments: { show: true, on: ['report', 'block'] }
            },
            email: {
              articles: { show: true, on: ['report', 'block'] },
              comments: { show: true, on: ['report', 'block'] }
            }
          },
          isSnoozed: true,
          createdAt: '2019-08-14T12:48:02.826Z',
          updatedAt: '2019-08-18T20:33:22.295Z'
        }
      }
    });
  });

  test('get notifications', () => {
    state = reducer({
      isShown: false,
      data: {},
      errorMessage: ''
    },
    {
      type: 'GET_NOTIFICATIONS',
      payload: {
        status: 200,
        data: [
          {
            id: 18,
            userId: 1,
            message: 'The article How to create sequalize seeds has been unblocked',
            url: 'https://authors-heaven.herokuapp.com/api/articles',
            status: 'unseen',
            type: 'email',
            createdAt: '2019-08-17T18:19:18.412Z',
            updatedAt: '2019-08-17T18:19:18.412Z'
          }
        ]
      }
    });
    expect(state).toEqual({
      isShown: false,
      data: {
        status: 200,
        data: [
          {
            id: 18,
            userId: 1,
            message: 'The article How to create sequalize seeds has been unblocked',
            url: 'https://authors-heaven.herokuapp.com/api/articles',
            status: 'unseen',
            type: 'email',
            createdAt: '2019-08-17T18:19:18.412Z',
            updatedAt: '2019-08-17T18:19:18.412Z'
          }
        ]
      },
      errorMessage: ''
    });
  });

  test('Show notifications', () => {
    state = reducer({ isShown: true }, { type: 'SHOW_NOTIFICATIONS', payload: true });
    expect(state).toEqual({ isShown: true });
  });

  test('Hide notifications', () => {
    state = reducer({ isShown: false }, { type: 'HIDE_NOTIFICATIONS', payload: false });
    expect(state).toEqual({ isShown: false });
  });

  test('Gets the profile', () => {
    state = reducer({},
      {
        type: 'GET_USER_PROFILE_ON_LOGIN',
        payload: { status: 200, profile: { username: 'username' } }
      });
    expect(state).toEqual({ profile: { status: 200, profile: { username: 'username' } } });
  });

  test('Snooze notifications', () => {
    state = reducer({},
      {
        type: 'SNOOZE_NOTIFICATION',
        payload: { status: 200, isShown: true, message: 'Notifications snoozed successfully' }
      });
    expect(state).toEqual({
      snoozeMessage: {
        isShown: true,
        message: 'Notifications snoozed successfully',
        status: 200
      }
    });
  });

  test('Error', () => {
    state = reducer({ isShown: false, data: {}, errorMessage: '' },
      { type: 'NOTIFICATIONS_CATCH_ERROR', payload: 'No notifications found for now, Thanks' });
    expect(state).toEqual({
      isShown: false,
      data: {},
      errorMessage: 'No notifications found for now, Thanks'
    });
  });
});

describe('Actions', () => {
  it('Gets notifications', () => {
    mockAxios.get = jest.fn(() => Promise.resolve({
      status: 200,
      data: {
        data: [
          {
            id: 18,
            userId: 1,
            message: 'The article How to create sequalize seeds has been unblocked',
            url: 'https://authors-heaven.herokuapp.com/api/articles',
            status: 'unseen',
            type: 'email',
            createdAt: '2019-08-17T18:19:18.412Z',
            updatedAt: '2019-08-17T18:19:18.412Z'
          }
        ]
      }
    }));
    store.dispatch(actions.get());
    notifications.render();
    expect(_.isEmpty(store.getState().notifications)).toEqual(false);
  });

  it('snoozes', () => {
    mockAxios.patch = jest.fn(() => Promise.resolve({
      snoozeMessage: {
        status: 200,
        message: 'successfully snoozed'
      }
    }));
    store.dispatch(actions.snooze('snooze'));
    expect(notifications.state().isSnoozed).toEqual(true);
  });

  it('gets configs', () => {
    mockAxios.patch = jest.fn(() => Promise.resolve({
      configs: {
        status: 200,
        config: {
          id: 1,
          userId: 1,
          config: {
            inApp: {
              articles: {
                show: true,
                on: ['report', 'block']
              },
              comments: {
                show: true,
                on: ['report', 'block']
              }
            },
            email: {
              articles: {
                show: true,
                on: ['report', 'block']
              },
              comments: {
                show: true,
                on: ['report', 'block']
              }
            }
          },
          isSnoozed: true,
          createdAt: '2019-08-14T12:48:02.826Z',
          updatedAt: '2019-08-19T07:17:18.179Z'
        }
      }
    }));
    store.dispatch(actions.getConfigs());
    expect(notifications.state().isSnoozed).toEqual(true);
  });

  it('hides notifications', () => {
    store.dispatch(actions.hide());
    expect(document.getElementById('notifications').style.display).toEqual('none');
    expect(document.getElementById('notifications-triangle').style.display).toEqual('none');
  });

  it('shows notifications', () => {
    store.dispatch(actions.show());
    expect(document.getElementById('notifications').style.display).toEqual('block');
    expect(document.getElementById('notifications-triangle').style.display).toEqual('block');
  });

  it('gets the profile of the user', () => {
    mockAxios.get = jest.fn(() => Promise.resolve({
      status: 200,
      response: { data: { profile: { id: 1 } } }
    }));
    store.dispatch(actions.getProfile(localStorage.getItem('token')));
    expect(store.getState().notifications.profile).toEqual({ id: 1 });
  });

  it('Rases an error when getting notifications', () => {
    mockAxios.get = jest.fn(() => Promise.reject({
      status: 404,
      response: { data: { errors: { notifications: 'No notifications found for now, thanks' } } }
    }));
    store.dispatch(actions.get());
    expect(notifications.state().notifications).toEqual([]);
  });

  it('Raises an error when it snoozes', () => {
    mockAxios.patch = jest.fn(() => Promise.reject({
      status: 404,
      response: { data: { errors: { notifications: 'configs not found, thanks' } } }
    }));
    store.dispatch(actions.snooze('snooze'));
    expect(notifications.state().notifications).toEqual([]);
  });

  it('rases an error when getting configs', () => {
    mockAxios.patch = jest.fn(() => Promise.reject({
      status: 404,
      response: { data: { errors: { notifications: 'configs not found, thanks' } } }
    }));
    store.dispatch(actions.getConfigs());
    expect(store.getActions()[6].type).toEqual('NOTIFICATIONS_CATCH_ERROR');
  });

  it('rases an error when getting configs', () => {
    mockAxios.patch = jest.fn(() => Promise.reject({
      status: 404,
      response: { data: { errors: { config: "The user doesn't exist" } } }
    }));
    store.dispatch(actions.getProfile());
    expect(store.getActions()[7].type).toEqual('NOTIFICATIONS_CATCH_ERROR');
  });

  it('Marks notifications as read', () => {
    mockAxios.patch = jest.fn(() => Promise.resolve({
      status: 200,
      data: { message: 'notification updated successfully' }
    }));
    store.dispatch(actions.markAsRead(localStorage.getItem('token'), 3));
    store.dispatch(actions.markAllAsRead(localStorage.getItem('token'), []));
    expect(store.getState().notifications.data).toEqual({});
  });

  it('Marks notifications as read', () => {
    mockAxios.patch = jest.fn(() => Promise.reject({
      status: 404,
      response: { data: { errors: 'Invalid id provided' } }
    }));
    store.dispatch(actions.markAsRead(localStorage.getItem('token'), '3'));
    // expect(store.getState().notifications.data).toEqual({});
  });
});
