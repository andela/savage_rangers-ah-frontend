import React from 'react';
import { wrap } from 'module';
import { shallow } from '../../enzyme';
import ArticleSocialSharing from '../Components/ArticleSocialSharing/ArticleSocialSharing';

describe('ArticleSocialSharing', () => {
  beforeEach(() => {
    global.FB = { ui: jest.fn() };
  });
  const defaultProps = {
    slug: 'test-slug',
    title: 'article-title'
  };

  const renderArticleSocialSharing = (args) => {
    const final = { ...defaultProps, ...args };
    return shallow(<ArticleSocialSharing {...final} />);
  };

  it('renders component', () => {
    const wrapper = renderArticleSocialSharing();
    wrapper.find('#twitter-share').simulate('click');
    wrapper.find('#facebook-share').simulate('click');
    wrapper.find('#linkedin-share').simulate('click');
    wrapper.find('#email-share').simulate('click');
    expect(wrapper.find('.social-share__container').length).toBe(1);
  });
});
