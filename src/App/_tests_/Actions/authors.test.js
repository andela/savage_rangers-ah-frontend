import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import authors from '../../../Redux/Actions/authors';
import actions from '../../../Redux/Actions';

const response = {
  authors: [
    {
      id: 2,
      username: 'BurindiAlain2',
      email: 'alain2@gmail.com',
      bio: null,
      profileImage: null,
      Articles: [{ id: 5 }, { id: 6 }]
    },
    {
      id: 42,
      username: 'nkpremices',
      email: 'premices.tuvere@gmail.com',
      bio: 'Here I am',
      profileImage:
        'https://res.cloudinary.com/al-tech/image/upload/v1567175923/m5bfsomeowj7jsq6b2cs.jpg',
      Articles: [{ id: 7 }]
    }
  ]
};

const mockStore = configureMockStore([thunk]);
let store;
describe('Test authors actions ', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  it('should dispatch  fetch authors success action', async () => {
    const expectedActions = [{ type: actions.FETCH_AUTHORS_PROFILE_SUCCESS, payload: response }];
    mockAxios.get = jest.fn(() => Promise.resolve({ status: 200, data: response }));
    store.dispatch(authors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch  fetch authors success action', async () => {
    const expectedActions = [{ type: actions.FETCH_AUTHORS_PROFILE_FAIL, payload: response }];
    mockAxios.get = jest.fn(() => Promise.reject({ status: 400, data: response }));
    store.dispatch(authors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
