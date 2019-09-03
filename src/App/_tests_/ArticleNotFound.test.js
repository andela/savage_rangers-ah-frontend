import React from 'react';
import { shallow } from '../../enzyme';
import ArticleNotFound from '../Components/ArticleNotFound/ArticleNotFound';

describe('testing the breadcrumb component', () => {
  const ArticleNotFoundWrapper = shallow(<ArticleNotFound />);
  it('should test if the component renders the appropriate jsx elements', () => {
    expect(ArticleNotFoundWrapper.find('div').exists()).toBe(true);
    expect(ArticleNotFoundWrapper).toMatchSnapshot();
  });
});
