import React from 'react';
import { shallow } from '../../enzyme';
import BottomPopular from '../Components/Popular/bottom-popular';

global.scrollTo = jest.fn();

const articles = [{
  id: 6,
  title: 'What you need to know to become a great software engineer in 2020',
  description: '10 Tips to become a great software engineer by 2020.',
  body: 'I get quite a few emails that basically say',
  slug: 'what-you-need-to-know-to-become-a-great-software-engineer-in-2020-nfovo9fghng',
  readTime: 6,
  coverImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565787533/rvkmbae3pcqhgysxoqnk.jpg',
  author: 42,
  category: 4,
  isBlocked: false,
  status: 'published',
  createdAt: '2019-08-14T12:58:54.185Z',
  updatedAt: '2019-08-16T09:19:39.885Z',
  deletedAt: null,
  Category: { name: 'TECHNOLOGY' },
  User: {
    username: 'MCFrank16',
    firstName: 'Frank',
    lastName: 'Mutabazi'
  }
}];

describe('testing the breadcrumb component', () => {
  const wrapper = shallow(<BottomPopular articles={articles} />);
  it('should test if the component renders the appropriate jsx elements', () => {
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls window.scrollTo when a popular article is clicked', () => {
    expect(global.scrollTo).toHaveBeenCalledWith(0, 50);
  });
});
