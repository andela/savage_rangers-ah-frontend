import React from 'react';
import { shallow } from '../../enzyme';
import Tags from '../Components/DisplayArticle/tags';

const data = [
  {
    id: 4,
    name: 'Software',
    createdAt: '2019-08-14T12:56:55.150Z',
    updatedAt: '2019-08-14T12:56:55.150Z'
  },
  {
    id: 6,
    name: 'Growing',
    createdAt: '2019-08-14T12:56:55.152Z',
    updatedAt: '2019-08-14T12:56:55.152Z'
  }
];
describe('testing the tags component', () => {
  const tags = shallow(<Tags tags={data} />);
  it('should test if the component renders the appropriate jsx elements', () => {
    expect(tags.find('div').exists()).toBe(true);
    expect(tags).toMatchSnapshot();
  });
});
