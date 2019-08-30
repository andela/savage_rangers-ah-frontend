import mockAxios from 'axios';
import thunk from 'redux-thunk';
import React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import reducers from '../../Redux/Reducers/Profile';
import profileActions from '../../Redux/Actions/Profile';
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
let wrapper;
const getState = {}; // initial state of the store
const store = mockStore(getState);
const props = {
<<<<<<< HEAD
  getProfile,
  getFollowing,
  getFolowers,
  history
=======
  isShown: false,
  show: jest.fn(() => {}),
  hide: jest.fn(() => {}),
  configs: { config: { isShown: true } },
  profile: { profile: {} },
  markAsRead: () => Promise.resolve({}),
  get: jest.fn(() => {})
>>>>>>> ft-notifications-display-166240794
};
const rating = {
  allUsers: 35,
  statistics: [
    {
      rating: 1,
      users: 5,
      percentage: 14
    },
    {
      rating: 2,
      users: 4,
      percentage: 11
    },
    {
      rating: 3,
      users: 9,
      percentage: 26
    },
    {
      rating: 4,
      users: 10,
      percentage: 29
    },
    {
      rating: 5,
      users: 7,
      percentage: 20
    }
  ]
};
const articles = [
  {
    id: 2,
    title: 'How to create sequalize seedss',
    description: 'How to set dummy data automaticallyy',
    body: 'Suppose we want to insert some dataa.',
    slug: 'How-to-create-sequalize-seedss',
    readTime: 4,
    coverImage: 'default.jpeg',
    author: 1,
    category: 1,
    isBlocked: false,
    status: 'published',
    createdAt: '2019-08-14T12:48:02.294Z',
    updatedAt: '2019-08-14T12:48:02.294Z',
    deletedAt: null,
    rating: 0,
    statistics: {
      slug: 'How-to-create-sequalize-seedss',
      stats: {
        reads: 0,
        shares: 0,
        comments: 0
      }
    }
  },
  {
    id: 3,
    title: 'How to create sequalize seedss',
    description: 'How to set dummy data automaticallyy',
    body: 'Suppose we want to insert some dataa.',
    slug: 'How-to-create-sequalize-seedss',
    readTime: 4,
    coverImage: 'default.jpeg',
    author: 1,
    category: 1,
    isBlocked: false,
    status: 'draft',
    createdAt: '2019-08-14T12:48:02.294Z',
    updatedAt: '2019-08-14T12:48:02.294Z',
    deletedAt: null,
    rating,
    statistics: {
      slug: 'How-to-create-sequalize-seedss',
      stats: {
        reads: 0,
        shares: 0,
        comments: 0
      }
    }
  }
];

<<<<<<< HEAD
test('render the profile component', () => {
  wrapper = shallow(<Profile {...props} />);
  wrapper.setProps({ profile: { username: 'alain', profileImage: 'defaultAvatar.jpg', Articles: articles } });
  wrapper.setProps({ following: { following: [] } });
  wrapper.setProps({ follower: { followers: [] } });
});
=======
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
>>>>>>> ft-notifications-display-166240794

test('test get profile reducer', () => {
  mockAxios.get = jest.fn(() => {
    Promise.resolve({
      status: 200,
      data: { profile: { Articles: articles } }
    });
  });
  store.dispatch(getProfile());
});

test('test get follower reducer', () => {
  mockAxios.get = jest.fn(() => Promise.resolve({
    status: 200,
    data: {
      follower: {
        pages: 1,
        currentPage: 1,
        pageSize: 1,
        count: 1,
        followers: [
          {
            follower: 'BurindiAlain2',
            profileImage: 'defaultAvatar.jpg'
          }
        ]
      }
    }
  }));
  store.dispatch(getFolowers());
});

test('test get following reducer', () => {
  mockAxios.get = jest.fn(() => Promise.resolve({
    status: 200,
    data: {
      following: {
        pages: 1,
        currentPage: 1,
        pageSize: 1,
        count: 1,
        following: [
          {
            follower: 'BurindiAlain2',
            profileImage: 'defaultAvatar.jpg'
          }
        ]
      }
    }
  }));
  store.dispatch(getFollowing());
});

test('should return errors', () => {
  mockAxios.get = jest.fn(() => Promise.reject({ response: { status: 404, message: 'not found' } }));
  store.dispatch(getFolowers());
  store.dispatch(getFollowing());
});

describe('Reducers', () => {
  test('GET_PROFILE', () => {
    const state = reducers({},
      { type: 'GET_PROFILE', payload: { profile: { Articles: articles } } });
    expect(state).toEqual({ data: { Articles: articles } });
  });

  test('GET_FOLLOWER', () => {
    const state = reducers({}, { type: 'GET_FOLLOWER', payload: { data: { followers: [] } } });
    expect(state).toEqual({ follower: { followers: [] } });
  });
<<<<<<< HEAD
  test('GET_FOLLOWING', () => {
    const state = reducers({}, { type: 'GET_FOLLOWING', payload: { data: { following: [] } } });
    expect(state).toEqual({ following: { following: [] } });
  });
});

test('map state to prop', () => {
  mapStateToProps({ profile: { data: {}, follower: {}, following: {} } });
=======

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
>>>>>>> ft-notifications-display-166240794
});
