import React from 'react';
import mockAxios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { ExempleArticle, mapStateToProps } from '../Components/Common/Bookmark/ExempleArticle';
import { Bookmark } from '../Components/Common/Bookmark/Bookmark';
import bookmarkActions from '../../Redux/Actions/bookmark';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { data: {} };
const store = mockStore(initialState);

mapStateToProps({ bookmark: { bookmarks: {}, bookmarked: false } });

describe('Container example', () => {
  const props = { getBookMarks: jest.fn(), bookmarks: [] };
  const example = shallow(<ExempleArticle store={store} {...props} />);
  example.setProps({ bookmarked: true });
  test('should have all required pros', () => {
    const currentProps = example.instance().props;
    expect(currentProps).toEqual(expect.objectContaining({ ...props, bookmarked: true }));
  });
});

describe('Bookmark', () => {
  const bookmarkProps = {
    slug: 'this_is-a-slug',
    bookmark: jest.fn()
  };
  const bookmark = shallow(<Bookmark store={store} {...bookmarkProps} />);
  bookmark.setProps({ bookmarks: [] });
  test('should bookmark an article', () => {
    bookmark.find('button').simulate('click');
    expect(bookmarkProps.bookmark).toHaveBeenCalled();
  });

  test('should change the icon if the article is bookmarked', () => {
    bookmark.setProps({ bookmarks: [{ articleSlug: 'this_is-a-slug' }] });
    expect(bookmark.find('.fa').exists()).toBe(true);
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
