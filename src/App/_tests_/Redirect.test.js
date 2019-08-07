import React from 'react';
import { shallow } from '../../enzyme';
import Redirect from '../Components/Redirection/redirect';

describe('Testing the Redirection page', () => {
  const redirect = shallow(<Redirect />);
  it('renders the redirect page component', () => {
    expect(redirect.find('div').exists()).toBe(true);
    expect(redirect.find('center').exists()).toBe(true);
    expect(redirect.find('center').text()).toEqual('Redirection Page');
  });
});
