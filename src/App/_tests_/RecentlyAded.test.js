import React from 'react';
import { shallow } from '../../enzyme';
import RecentlyAdded from '../Components/Home/RecentlyAdded';

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

const recentlyAdded = shallow(<RecentlyAdded {...props} />);

describe('RecentlyAdded', () => {
  it('renders the component', () => {
    expect(recentlyAdded.find('.article-card').exists()).toEqual(true);
  });
});
