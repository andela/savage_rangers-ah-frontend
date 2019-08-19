import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import terms from '../../../Redux/Actions/terms';
import actions from '../../../Redux/Actions';

const response = { termsDocument: { termsAndConditions: 'Authors Haven Terms and conditions' } };

const mockStore = configureMockStore([thunk]);
let store;
describe('Test terms actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  it('should dispatch term success action', async () => {
    const expectedActions = [{ type: actions.FETCH_TERMS, payload: response.termsDocument }];
    mockAxios.get = jest.fn(() => Promise.resolve({ status: 200, data: response }));
    store.dispatch(terms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
