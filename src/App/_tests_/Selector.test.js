import React from 'react';
import { shallow } from '../../enzyme';

import Selector from '../Components/CreateArticle/Selector';

describe('Selector', () => {
  const props = {
    categories: [{
      id: 1,
      name: 'LOVE'
    },
    {
      id: 2,
      name: 'ENTERTAINMENT'
    }
    ],
    addContent: jest.fn(),
    categoryId: 1

  };
  const Select = shallow(<Selector {...props} />);
  test('it should render', () => {
    expect(Select.find('.category-dropdown__selector').exists()).toBe(true);
  });
});
