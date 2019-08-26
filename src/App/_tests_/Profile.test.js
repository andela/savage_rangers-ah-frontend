import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Profile, mapStateToProps } from '../Components/Common/NavProfile/Profile';
import io, { serverSocket } from '../../__mocks__/socket.io-client';

document.body.innerHTML = `<div> 
 <div class="notify-bubble" ></div>
</div>`;

// Initializing the fake socket
io.connect();

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { isShown: false, hide: jest.fn(() => {}), show: jest.fn(() => {}) };
const store = mockStore(initialState);

mapStateToProps({
  notifications: {
    data: {},
    configs: { config: { isShown: true } },
    profile: { profile: {} }
  }
});

const props = {
  isShown: false,
  show: jest.fn(() => {}),
  hide: jest.fn(() => {}),
  configs: { config: { isShown: true } },
  profile: { profile: {} },
  markAsRead: () => Promise.resolve({}),
  get: jest.fn(() => {})
};

const profile = shallow(<Profile store={store} {...props} />);

describe('Profile', () => {
  it('renders the navbar component', () => {
    expect(profile.find('Fragment').exists()).toEqual(true);
  });
  it('renders the notifications component', () => {
    // checks the profile
    profile.instance().componentWillReceiveProps({
      isShown: true,
      profile: { profile: {} },
      configs: { config: { isShown: true } },
      data: [
        {
          id: 1,
          message: 'Jesus is Lord',
          url: 'url'
        }
      ]
    });

    // Fetch notifications
    const newNotifications = new Array(10);

    profile.instance().componentWillReceiveProps({
      isShown: true,
      profile: { profile: {} },
      configs: { config: { isShown: true } },
      data: newNotifications
    });

    profile.instance().componentWillReceiveProps({
      isShown: true,
      profile: { profile: {} },
      configs: { config: { isShown: true } },
      data: []
    });

    // Shows notifications
    profile.instance().showNotifications();

    // hides notifications
    profile.setState({ isShown: false });
    profile.instance().showNotifications();

    expect(profile.find('Fragment').exists()).toEqual(true);
  });

  it('renders the profile img', () => {
    profile.setState({
      isShown: false,
      profile: { profileImage: 'https://cloudinary' }
    });
    profile.instance().render();
    profile.setState({ isShown: false, profile: undefined });
    profile.instance().render();
    profile.instance().componentWillReceiveProps({
      isShown: true,
      profile: {},
      configs: {},
      data: []
    });
    expect(profile.find('img').exists()).toEqual(true);
  });

  it('renders the io notification for all events', () => {
    profile.setState({ profile: { id: 3 } });
    serverSocket.emit('blockArticle', {
      inAppNotification: {
        id: 1,
        userId: 3,
        url: 'url/url',
        message: 'message'
      }
    });

    serverSocket.emit('unblockArticle', {
      inAppNotification: {
        id: 1,
        userId: 3,
        url: 'url/url',
        message: 'message'
      }
    });

    serverSocket.emit('blockComment', {
      inAppNotification: {
        id: 1,
        userId: 3,
        url: 'url/url',
        message: 'message'
      }
    });

    serverSocket.emit('unblockComment', {
      inAppNotification: {
        id: 1,
        userId: 3,
        url: 'url/url',
        message: 'message'
      }
    });

    serverSocket.emit('reportArticle', {
      inAppNotification: {
        id: 1,
        userId: 3,
        url: 'url/url',
        message: 'message'
      }
    });

    serverSocket.emit('reportComment', {
      inAppNotification: {
        id: 1,
        userId: 3,
        url: 'url/url',
        message: 'message'
      }
    });

    profile.instance().componentDidMount();
    // console.log(profile.debug());
  });

  it('should mark as read a notification', () => {
    profile.instance().markIoNotificationAsRead(3);
    expect(store.getState().isShown).toEqual(false);
  });
});
