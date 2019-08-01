import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Home, mapStateToProps } from '../Components/Home/Home';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { data: {} };
const store = mockStore(initialState);

mapStateToProps({ passwordReset: { data: { user: {} } } });

describe('Home', () => {
  it('renders the Home component', () => {
    const home = shallow(<Home store={store} data={{ user: { email: 'ughij' } }} />);
    expect(home.find('h1').text()).toEqual('Authors Heaven');
    expect(home
      .find('p')
      .at(0)
      .text()).toEqual('This is the home page of authors heaven v 1.0.0');
  });
  it('renders the Home component without props', () => {
    const home = shallow(<Home store={store} />);
    expect(home.find('h1').text()).toEqual('Authors Heaven');
  });
});
