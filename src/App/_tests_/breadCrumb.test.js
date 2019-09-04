import React from 'react';
import { shallow } from '../../enzyme';
import BreadCrumb from '../Components/DisplayArticle/breadCrumb';

describe('testing the breadcrumb component', () => {
  const breadCrumb = shallow(<BreadCrumb />);
  it('should test if the component renders the appropriate jsx elements', () => {
    expect(breadCrumb.find('div').exists()).toBe(true);
    expect(breadCrumb).toMatchSnapshot();
  });
});
