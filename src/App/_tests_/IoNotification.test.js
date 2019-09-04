import React from 'react';
import { shallow } from '../../enzyme';
import IoNotification from '../Components/Notifications/IoNotification';

const props = {
  link: 'url/url',
  message: 'message',
  id: 3,
  markAsRead: jest.fn()
};

describe('IoNotification', () => {
  it('renders the IoNotification component', () => {
    const navLinks = shallow(<IoNotification {...props} />);
    expect(navLinks.find('div').exists()).toEqual(true);
  });
});
