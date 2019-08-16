import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import { shallow } from '../../enzyme';
import BookMark from '../Components/Profile/BookMark';
import DeleteModal from '../Components/Profile/DeleteModal';
import { Follow } from '../Components/Profile/Follow';
import Follower from '../Components/Profile/Follower';
import Following from '../Components/Profile/Following';
import SingleArticle from '../Components/Profile/SingleArticle';
import UpdateProfileForm from '../Components/Profile/UpdateProfileForm';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
let wrapper;
const getState = {}; // initial state of the store
const store = mockStore(getState);
describe('BookMark', () => {
  const props = {
    data: {
      bookmarks: [
        {
          Article: {
            id: 1,
            slug: 'this-is-it',
            Category: { name: 'IOT' },
            User: { profileImage: 'test.jpg' }
          }
        }
      ],
      paginationDetail: { count: 1, currentPage: 1, pages: 1 }
    },
    owner: true,
    remove: jest.fn()
  };
  test('should render the bookmark component', () => {
    wrapper = shallow(<BookMark
      remove={jest.fn()}
      data={{ bookmarks: [], paginationDetail: { count: 1, currentPage: 1, pages: 1 } }}
    />);
  });
  test('should render with props', () => {
    wrapper = shallow(<BookMark {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.remove).toHaveBeenCalled();
  });
});

describe('DeleteModal', () => {
  const props = {
    delete: jest.fn(),
    id: '1',
    slug: 'test-slug'
  };
  wrapper = shallow(<DeleteModal {...props} />);
  test('should remove a bookmark', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
  });
});

describe('Follow', () => {
  const props = {
    user: {
      toCheck: 'alain',
      toFollow: 'alain2'
    },
    follow: jest.fn(),
    unfollow: jest.fn(),
    users: [{ follower: 'alain' }],
    compareName: 'follower',
    className: {
      follow: 'col-2',
      unfollow: 'col-6'
    }
  };
  test('should render the unfollow button', () => {
    localStorage.setItem('username', 'alain');
    wrapper = shallow(<Follow {...props} store={store} />);
    wrapper.find('button').simulate('click');
    expect(props.unfollow).toHaveBeenCalled();
  });
  test('should render the follow button', () => {
    props.user.toCheck = 'anotherone';
    wrapper = shallow(<Follow {...props} store={store} />);
    wrapper.find('button').simulate('click');
    expect(props.follow).toHaveBeenCalled();
  });
});

describe('Follower', () => {
  const props = {
    followers: [{ follower: 'alain' }],
    following: [{ following: 'alain' }],
    owner: true,
    unfollow: jest.fn()
  };
  test('should render the follow button', () => {
    wrapper = shallow(<Follower follower={[]} />);
    wrapper = shallow(<Follower {...props} />);
  });
});

describe('Follower', () => {
  const props = {
    following: [{ following: 'alain' }],
    owner: true,
    unfollow: jest.fn()
  };
  test('should render unfollow a user', () => {
    wrapper = shallow(<Following following={[]} unfollow={props.unfollow} />);
    wrapper = shallow(<Following {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.unfollow).toHaveBeenCalled();
  });
});

describe('SingleArticle', () => {
  const props = {
    article: {
      status: 'published',
      body: 'hs fih bkfdihbksd',
      rating: { statistics: [] },
      statistics: { stats: {} }
    },
    owner: true,
    deleteArticleAction: jest.fn()
  };
  wrapper = shallow(<SingleArticle {...props} />);
  test('should change the URL if drafted', () => {
    props.article.status = 'draft';
    wrapper = shallow(<SingleArticle {...props} />);
  });

  test('should render the rater with 0 if no rating', () => {
    props.article.rating = 0;
    wrapper = shallow(<SingleArticle {...props} />);
  });
});

describe('UpdateProfileForm', () => {
  const props = {
    profile: {},
    validator: { message: jest.fn() },
    onChange: jest.fn(),
    submitProfile: jest.fn()
  };

  wrapper = shallow(<UpdateProfileForm {...props} />);
});
