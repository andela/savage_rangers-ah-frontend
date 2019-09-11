import React from 'react';
import mockAxios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Bookmark } from '../Components/Common/Bookmark/Bookmark';
import bookmarkActions from '../../Redux/Actions/bookmark';
import bookmarkReducer from '../../Redux/Reducers/Bookmark';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { data: {} };
const store = mockStore(initialState);

describe('Bookmark', () => {
  const bookmarkProps = {
    slug: 'this_is-a-slug',
    bookmark: jest.fn(),
    paginationDetail: { count: 1, currentPage: 1, pages: 1 }
  };
  const bookmark = shallow(<Bookmark store={store} {...bookmarkProps} />);
  bookmark.setProps({ bookmarks: [] });
  test('should bookmark an article', () => {
    bookmark.find('button').simulate('click');
    expect(bookmarkProps.bookmark).toHaveBeenCalled();
  });

  test('should change the icon if the article is bookmarked', () => {
    bookmark.setProps({ bookmarks: [{ articleSlug: 'this_is-a-slug' }] });
  });
});

describe('Bookmark actions', () => {
  test('should get bookmarked article', () => {
    mockAxios.get = jest.fn(() => Promise.resolve({ data: { data: { bookmarks: [{ articleSlug: 'simple-react-validtion-by-alain' }] } } }));
    store.dispatch(bookmarkActions.getBookMarks('alain'));
  });
  test('should return an empty array if the request fails', () => {
    mockAxios.get = jest.fn(() => Promise.reject({ status: 404, data: { error: 'no bookmarked article' } }));
    store.dispatch(bookmarkActions.getBookMarks('alain'));
  });

  test('Should bookmark an article', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ data: { message: 'bookmarked corectly' } }));
    store.dispatch(bookmarkActions.bookmark('slug'));
  });
});

test('Should have dispatched all actions', () => {
  expect(store.getActions()[0]).toEqual({
    type: 'GET_BOOKMARK',
    payload: [{ articleSlug: 'simple-react-validtion-by-alain' }]
  });
  expect(store.getActions()[1]).toEqual({ type: 'NO_BOOKMARK' });
  expect(store.getActions()[2]).toEqual({ type: 'BOOKMARK', payload: 'bookmarked corectly' });
});

describe('Reducers', () => {
  const action = {
    type: 'GET_BOOKMARK',
    payload: [
      {
        articleSlug: 'i-dont-want-to-live-in-ohio-i-belong-in-new-york-j07n6mx0y8q',
        Article: {
          id: 8,
          title: '‘I Don’t Want to Live in Ohio. I Belong in New York!’',
          description: 'A move was affecting my daughter more than I thought it would',
          User: { firstName: null, lastName: null, profileImage: null },
          Category: { name: 'LOVE' }
        }
      }
    ]
  };
  test('should get bookmark', () => {
    const state = bookmarkReducer({}, action);
    expect(state).toEqual({ bookmarked: false, bookmarks: action.payload });
  });
  test('should send an empty array if no bookmark found', () => {
    const state = bookmarkReducer({}, { type: 'NO_BOOKMARK' });
    expect(state).toEqual({ bookmarked: false, bookmarks: [] });
  });
  test('should send true if the bookmark action passed', () => {
    const state = bookmarkReducer({}, { type: 'BOOKMARK' });
    expect(state).toEqual({ bookmarked: true });
  });
});
