import React from 'react';
import { shallow } from '../../enzyme';
import ArticleBody from '../Components/DisplayArticle/articleBody';

const data = {
  title: 'software',
  body: 'Software',
  readTime: '2min',
  createdAt: '2019-08-14T12:56:55.150Z',
  coverImage: '',
  firstName: 'Frank',
  lastName: 'Mutabazi',
  profileImage: ''
};

describe('testing the article body component', () => {
  const articleBody = shallow(<ArticleBody
    title={data.title}
    body={data.body}
    readTime={data.readTime}
    createdAt={data.createdAt}
    coverImage={data.coverImage}
    firstName={data.firstName}
    lastName={data.lastName}
    profileImage={data.profileImage}
  />);
  it('should test if the component renders the appropriate jsx elements', () => {
    expect(articleBody.find('div').exists()).toBe(true);
    expect(articleBody).toMatchSnapshot();
  });

  it('testing when the token is set', () => {
    articleBody.setState({ username: 'BurindiAlain2' });
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IkJ1cmluZGlBbGFpbjIiLCJlbWFpbCI6ImFsYWluMkBnbWFpbC5jb20ifSwiaWF0IjoxNTY3NzU0OTA2LCJleHAiOjE1Njc4NDEzMDZ9.6S_8T58qjdtJlam2EJIXDLa7btzlIhuqhke8Kxg6MEk');
    
  });
});
