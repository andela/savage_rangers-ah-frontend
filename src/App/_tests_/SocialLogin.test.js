import React from 'react';
import { shallow } from '../../enzyme';
import SocialLogin from '../Components/SocialLogin/socialLogin';

describe('Testing the Social Media Login Component', () => {
  const socialLogin = shallow(<SocialLogin />);
  it('renders the social login component', () => {
    expect(socialLogin.find('div').exists()).toBe(true);
    expect(socialLogin.find('div').hasClass('social-btn'));
    expect(socialLogin.find('Separator').exists()).toBe(true);
    expect(socialLogin.find('Separator').prop('name')).toEqual('or');
    expect(socialLogin.find('a').exists()).toBe(true);
    expect(socialLogin.find('a').at(0).hasClass('btn'));
  });
});
