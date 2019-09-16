import React from 'react';
import { shallow } from '../../enzyme';
import RandomHeader from '../Components/Home/RandomHeader';

const article = {
  id: 1,
  User: { username: 'username' },
  Category: {
    id: 1,
    name: 'name'
  },
  body: 'body'
};

const props = { randomArticles: [article, article, article, article, article] };

const randomHeader = shallow(<RandomHeader {...props} />);

describe('RandomHeader', () => {
  it('renders the component', () => {
    expect(randomHeader.find('.article-card').exists()).toEqual(true);
  });
});
