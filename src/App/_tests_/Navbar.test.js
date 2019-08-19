import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { shallow } from '../../enzyme';
import { Navbar } from '../Components/Common/NavProfile/navbar';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const initialState = { hide: () => {} };
const store = mockStore(initialState);

const navbar = shallow(<Navbar store={store} hide={() => {}} />);

describe('Navbar', () => {
  it('renders the navbar component', () => {
    expect(navbar.find('nav').exists()).toEqual(true);
    expect(navbar.find('Logo').exists()).toEqual(true);
    expect(navbar.find('navLinks').exists()).toEqual(true);
  });
  it('simulates the hide function for notifications', () => {
    navbar.instance().hideNotificationsComponent();
    expect(navbar.find('nav').exists()).toEqual(true);
  });
  it('Shows the profile', () => {
    localStorage.setItem('token', 'fsdg');
    navbar.instance().render();
  });
});
