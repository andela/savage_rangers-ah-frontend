import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import followDispatch from '../../../Redux/Actions/Follow';
import actions from '../../../Redux/Actions';

const response = {
  id: 2,
  username: 'BurindiAlain2',
  email: 'alain2@gmail.com',
  bio: null,
  profileImage: null,
  Articles: [{ id: 5 }, { id: 6 }]
};

const mockStore = configureMockStore([thunk]);
let store;
describe('Test authors actions ', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch unfollow authors success action', async () => {
    const expectedActions = [{ type: actions.UNFOLLOW, payload: response }];
    mockAxios.delete = jest.fn(() => Promise.resolve({ status: 200, data: response }));
    store.dispatch(followDispatch.unfollow(response.username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch follow authors success action', async () => {
    const expectedActions = [{ type: actions.FOLLOW, payload: response }];
    mockAxios.post = jest.fn(() => Promise.resolve({ status: 201, data: response }));
    store.dispatch(followDispatch.follow()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
