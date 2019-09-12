import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import { shallow } from '../../../enzyme';
import { ReportArticle } from '../../Components/ReportArticle/ReportArticle';
import reportArticleAction from '../../../Redux/Actions/reportArticle';
import mockAxios from '../../../__mocks__/axios';

const { reportArticle } = reportArticleAction;

const midleware = [thunk, promiseMiddleware];
const mockStore = configureStore(midleware);


describe('<ReportArticle />', () => {
  describe('dispatch acton ', () => {
    let store;
    const initialState = { reportData: {} };
    beforeEach(() => {
      store = mockStore(initialState);
    });
    it('dispatch action success message', async (done) => {
      const action = { type: 'REPORT_ARTICLE' };
      const expectedAction = [action];
      store = mockStore(expectedAction, done);
      mockAxios.get = jest.fn(() => Promise.resolve({
        response: {
          data: {
            status: 200,
            message: 'Article reported successfully'
          }
        }
      }));
      await store.dispatch(reportArticle());
      done();
    });
    it('dispatch action error message', async (done) => {
      const action = { type: 'REPORT_ARTICLE' };
      const expectedAction = [action];
      store = mockStore(expectedAction, done);

      mockAxios.get = jest.fn(() => Promise.reject({
        error: {
          response: {
            data: {
              status: 404,
              errors: { message: 'You can not report article twice with the same reason' }
            }
          }
        }

      }));
      await store.dispatch(reportArticle());
      done();
    });
  });
  describe('render()', () => {
    const props = {
      reportArticle: jest.fn(),
      history: { push: jest.fn() },
      reportError: 'Sorry, You can not report this Article twice with the same reason!!!'
    };

    const wrapper = shallow(<ReportArticle store={mockStore} {...props} data />);
    wrapper.setState({
      hovered: true,
      displayMessage: false
    });
    it('should render the component', () => {
      wrapper.render();
      wrapper.instance().setHover();
      wrapper.instance().report({ target: { value: '1' } });
      expect(wrapper.find('div').exists()).toEqual(true);
      expect(wrapper.find('button').exists()).toEqual(true);
      wrapper.find('button').simulate('click');
      wrapper.find('li[value="1"]').simulate('click', { target: { value: 1 } });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    const props = {
      reportError: undefined,
      reportArticle: jest.fn(),
      history: { push: jest.fn() }
    };

    const wrapper = shallow(<ReportArticle store={mockStore} {...props} data />);
    wrapper.setState({
      hovered: true,
      displayMessage: false
    });

    beforeEach(() => {
      jest.useFakeTimers();
    });
    it('should render the component', () => {
      wrapper.render();
      wrapper.instance().setHover();
      wrapper.instance().setState({ displayMessage: true });
      wrapper.instance().report({ target: { value: '1' } });
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });
});
