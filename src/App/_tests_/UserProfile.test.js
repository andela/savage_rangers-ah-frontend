import React from 'react';
import { shallow } from '../../enzyme';
import { Profile } from '../Components/Profile/Profile';

const history = { push: jest.fn(), location: { pathname: 'localhost/profile/Burindi' } };

let wrapper;
const followers = [
  {
    follower: 'alain',
    profileImage: 'default.jpg'
  }
];
const following = [
  {
    following: 'alain',
    profileImage: 'default.jpg'
  }
];
const props = {
  bookmarks: {},
  getProfile: jest.fn(),
  getFollowing: jest.fn(),
  getFolowers: jest.fn(),
  history,
  updateProfile: jest.fn(),
  getBookMarks: jest.fn(),
  removeBookmark: jest.fn(),
  unfollow: jest.fn(),
  follow: jest.fn(),
  deleteArticle: jest.fn(),
  followers,
  following
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

test('render the profile component', () => {
  wrapper = shallow(<Profile {...props} />);
  expect(wrapper.instance().props).toEqual(props);
  wrapper.setProps({
    profile: {
      username: 'alain',
      profileImage: 'defaultAvatar.jpg',
      phoneNumber: '+243',
      gender: 'male',
      address: 'kigali',
      Articles: articles
    }
  });
  wrapper.setProps({ following: [] });
  wrapper.setProps({ followers: [] });
});

test('sould check for new data if the props change after an action', () => {
  wrapper.setProps({
    updated: true,
    remove: true,
    followed: true,
    unfollowed: true,
    deleted: true,
    deleteFailed: true,
    bookmarks: {
      Article: [{ articleSlug: 'hsgdhk' }],
      paginationDetail: { count: 1, currentPage: 1, pages: 1 }
    }
  });
  expect(props.getProfile).toHaveBeenCalled();
  expect(props.getBookMarks).toHaveBeenCalled();
  expect(props.getFolowers).toHaveBeenCalled();
  expect(props.getFollowing).toHaveBeenCalled();
});
test('should sumbit the new profile', () => {
  const event = { preventDefault: jest.fn() };
  wrapper.instance().validator.fields.Bio = false;
  wrapper.instance().submitProfile(event);
});

test('should change the state from update component', () => {
  const event = { preventDefault: jest.fn() };
  event.target = { name: 'profileImage', files: [{ file: 'sample' }] };
  wrapper.instance().onChange(event);

  event.target = { name: 'gender', value: 'male' };
  wrapper.instance().onChange(event);
  expect(wrapper.instance().state).toEqual({
    username: 'Burindi',
    temporally: {
      address: 'kigali',
      phoneNumber: '+243',
      username: 'alain',
      profileImage: { file: 'sample' },
      gender: 'male'
    }
  });
});

test('should sumbit the new profile', () => {
  const event = { preventDefault: jest.fn() };
  wrapper.instance().validator.fields.Bio = true;
  wrapper.instance().submitProfile(event);
  expect(props.updateProfile).toHaveBeenCalled();
});

test('should remove a bookmarked article', () => {
  wrapper.setProps({ owner: true });
  wrapper.instance().removeBookmark('slug');
  expect(props.removeBookmark).toHaveBeenCalled();
  wrapper.instance().changePage(2);
});
