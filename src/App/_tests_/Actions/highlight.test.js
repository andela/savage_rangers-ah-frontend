import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import getHighlight from '../../../Redux/Actions/getHighlight';
import postHighlight from '../../../Redux/Actions/postHighlight';
import actions from '../../../Redux/Actions';

const response = {
  highlighted: {
    highlighted: [
      {
        id: 56,
        startIndex: 3,
        lastIndex: 21,
        text: 'simply dummy text',
        comment: 'hey',
        articleSlug: 'todays-testsss-d7qteh2q5qw',
        userId: 1,
        nodeId: 'node-6230',
        createdAt: '2019-09-16T12:02:43.532Z',
        updatedAt: '2019-09-16T12:02:43.532Z'
      },
      {
        id: 57,
        startIndex: 8,
        lastIndex: 35,
        text: 'long established fact that',
        comment: 'hello',
        articleSlug: 'todays-testsss-d7qteh2q5qw',
        userId: 1,
        nodeId: 'node-6219',
        createdAt: '2019-09-16T12:03:33.117Z',
        updatedAt: '2019-09-16T12:03:33.117Z'
      }
    ]
  }
};
const postResponse = {
  highlighted: {
    highlighted: {
      id: 56,
      startIndex: 3,
      lastIndex: 21,
      text: 'simply dummy text',
      comment: 'hey',
      articleSlug: 'todays-testsss-d7qteh2q5qw',
      userId: 1,
      nodeId: 'node-6230',
      createdAt: '2019-09-16T12:02:43.532Z',
      updatedAt: '2019-09-16T12:02:43.532Z'
    }
  }
};

const mockStore = configureMockStore([thunk]);
let store;
describe('Test highlight  actions ', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  it('should dispatch  fetch highlights success action', async () => {
    const expectedActions = [{ type: actions.FETCH_HIGHLIGHT_SUCCESS, payload: response }];
    mockAxios.get = jest.fn(() => Promise.resolve({ status: 200, data: response }));
    store.dispatch(getHighlight()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch  fetch  highlights fail action', async () => {
    const expectedActions = [{ type: actions.FETCH_HIGHLIGHT_FAIL, payload: response }];
    mockAxios.get = jest.fn(() => Promise.reject({ status: 400, data: response }));
    store.dispatch(getHighlight()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch post  highlights success action', async () => {
    const expectedActions = [{ type: actions.POST_HIGHLIGHT_SUCCESS, payload: postResponse }];
    mockAxios.get = jest.fn(() => Promise.resolve({ status: 201, data: postResponse }));
    store.dispatch(postHighlight()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch  fetch  highlights fail action', async () => {
    const expectedActions = [{ type: actions.POST_HIGHLIGHT_FAIL, payload: { error: '' } }];
    mockAxios.get = jest.fn(() => Promise.reject({ status: 400, data: { error: '' } }));
    store.dispatch(getHighlight()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
