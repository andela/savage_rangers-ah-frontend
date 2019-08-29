import React from 'react';
import { shallow } from '../../enzyme';
import { Rating, mapStateToProps } from '../Components/DisplayArticle/Rating';

const initialState = { articleRatings: { data: {}, errorMessage: 'message', successMessage: 'message' } };

mapStateToProps(initialState);

const props = {
  areUsersShown: false,
  rating: 1,
  stats: [
    {
      rating: 1,
      users: ['1', []]
    }
  ],
  showUsersForRating: () => jest.fn()
};

const component = shallow(<Rating {...props} />);
describe('Rating', () => {
  it('renders the Rating component', () => {
    component.instance().showOrHide();
    expect(component.find('.rating').exists()).toEqual(true);
  });

  it('It shows users of the second page', () => {
    component.instance().gotoNextPage();
    expect(component.state().page).toEqual(2);
  });

  it('It goes back to the first page', () => {
    component.instance().gotoPrevPage();
    expect(component.state().page).toEqual(1);
  });

  it('hides users', () => {
    component.instance().hide();
    expect(component.find('.no-users').exists()).toEqual(true);
    expect(component.find('.no-users').text()).toEqual('No users for this rating ');
  });
});
