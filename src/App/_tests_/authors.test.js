import React from 'react';
import { shallow } from '../../enzyme';
import { DisplayAuthors, mapDispatchToProps, mapStateToProps } from '../Components/authors';

describe('Fetch Authors', () => {
  beforeEach(() => {
    localStorage.setItem('token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkJ1cmluZGkiLCJlbWFpbCI6ImFsYWluMUBnbWFpbC5jb20ifSwiaWF0IjoxNTY3NTEzMDk2LCJleHAiOjE1Njc1OTk0OTZ9.HyhuF8zYplEcqczfY3mLAqiX5xE_kS3v-LMaoKdnrJ4');
  });

  const defaultProps = {
    getAuthors: jest.fn(),

    authorReducer: {
      fetchAuthors: true,
      authors: [
        {
          id: 2,
          username: 'BurindiAlain2',
          email: 'alain2@gmail.com',
          bio: null,
          profileImage: null,
          Articles: [{ id: 5 }, { id: 6 }],
          followers: [
            { follower: 'Burindi', profileImage: null },
            { follower: 'BurindiAlain3', profileImage: null },
            { follower: 'BurindiAlain44', profileImage: null }
          ]
        },
        {
          id: 42,
          username: 'nkpremices',
          email: 'premices.tuvere@gmail.com',
          bio: 'Here I am',
          profileImage:
            'https://res.cloudinary.com/al-tech/image/upload/v1567175923/m5bfsomeowj7jsq6b2cs.jpg',
          Articles: [{ id: 7 }],
          followers: [{}]
        }
      ],
      paginationDetails: { currentPage: 1 },
      unfollow: {},
      follow: {}
    }
  };
  const renderDisplayAuthors = (args) => {
    const final = { ...defaultProps, ...args };
    return shallow(<DisplayAuthors {...final} />);
  };

  it('renders the authors page with content', () => {
    const wrapper = renderDisplayAuthors();
    const prop = { authorReducer: defaultProps.authorReducer };
    wrapper.setProps(prop);
    mapStateToProps({});
    mapDispatchToProps(jest.fn()).getAuthors({});
    mapDispatchToProps(jest.fn()).unfollow({});
    mapDispatchToProps(jest.fn()).follow({});
    wrapper.instance().changeCurrentPage(1);
    expect(wrapper.find('.author-card__container').length).toBe(2);
  });
  it('renders the authors page with content', () => {
    const wrapper = renderDisplayAuthors({ follow: jest.fn(), unfollow: jest.fn() });
    wrapper
      .find('#view-follow-button')
      .first()
      .simulate('click');
    wrapper
      .find('#view-unfollow-button')
      .first()
      .simulate('click');
  });

  it('renders the authors page with missing content', () => {
    const wrapper = renderDisplayAuthors({
      authorReducer: {
        authors: [{ username: null, Articles: [], followers: [] }],
        paginationDetails: { currentPage: 1 }
      }
    });
    wrapper.instance().changeCurrentPage(10);
  });
});
