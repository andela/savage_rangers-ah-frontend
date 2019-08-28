import React from 'react';
import { shallow } from '../../../enzyme';
import tags from '../../../__mocks__/tags';
import category from '../../../__mocks__/categories';
import articleToUpdate from '../../../__mocks__/article';
import mockAxios from '../../../__mocks__/axios';

import { UpdateArticle } from '../../Components/CreateArticle/UpdateArticle';

const props = {
  categories: jest.fn(),
  tags,
  initialState: null,
  changeState: jest.fn(),
  getTags: jest.fn(),
  imageUploder: jest.fn(() => Promise.resolve('http://localhost/jpeg.jpg')),
  publish: jest.fn(() => Promise.resolve('article updated successfully')),
  getCategories: jest.fn(),
  getArticleDetail: jest.fn(),
  getArticleTags: jest.fn(),
  category
};

describe('Update article', () => {
  const routeParam = { match: { params: { slug: 'let me see' } } };
  const routeQuery = { location: { search: '?edit=true' } };
  const notFound = 'Article not found';
  const Update = shallow(<UpdateArticle {...props} {...routeParam} {...routeQuery} />);

  test('should render the loader', () => {
    expect(Update.find('loader').exists()).toBe(true);
    Update.setState({ isLoading: false, articleToUpdate, articleTags: tags });
  });

  test('should update the title', () => {
    Update.setState({ isLoading: false });
    Update.find('#title').simulate('change', { target: { name: 'title', value: 'test title' } });
    expect(Update.state().article.title).toEqual('test title');
  });

  test('should update the description', () => {
    Update.find('#description').simulate('change', { target: { name: 'description', value: 'test description' } });
    expect(Update.state().article.description).toEqual('test description');
  });

  test('should update the image', () => {
    mockAxios.post = jest.fn(() => Promise.resolve({ data: { secure_url: 'http://jpeg.jpeg' } }));
    const fileimage = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    Update.find('#cover-image').simulate('change', { target: { files: [fileimage] } });
  });

  test('should update the body of the article', () => {
    Update.instance().addArticleToState('jest test');
    expect(Update.state().article.body).toEqual('jest test');
  });

  test('should update the article tags', () => {
    Update.instance().addTags(['jest']);
    expect(Update.state().article.tags.length).toEqual(1);
  });

  test('should update state with categories and tags', () => {
    Update.instance().componentWillReceiveProps({
      listOfCategories: [{ id: 1, name: 'jest' }],
      listOfTags: [{ id: 1, name: 'fn' }],
      articleTags: { data: tags },
      articleToUpdate
    });
    expect(...Update.state().categories).toEqual({ id: 1, name: 'jest' });
    expect(...Update.state().tags).toEqual({ id: 1, name: 'fn' });
    expect(Update.state().stateTags).toEqual(['laravel', 'C', 'C#', 'C++']);
  });

  test('should update state with categories and tags', () => {
    Update.instance().componentWillReceiveProps({
      listOfCategories: [{ id: 1, name: 'jest' }],
      listOfTags: [{ id: 1, name: 'fn' }],
      articleTags: { data: tags },
      articleToUpdate,
      notFound
    });
    expect(...Update.state().categories).toEqual({ id: 1, name: 'jest' });
    expect(...Update.state().tags).toEqual({ id: 1, name: 'fn' });
    expect(Update.state().stateTags).toEqual(['laravel', 'C', 'C#', 'C++']);
  });

  test('should publish article', () => {
    Update.find('#published').simulate('click');
    Update.setState({ published: true });
    expect(Update.find('Redirect').exists()).toBe(true);
  });

  test('should update state with categories and tags', () => {
    Update.setState({ published: false });
    Update.instance().componentWillReceiveProps({
      listOfCategories: [{ id: 1, name: 'jest' }],
      listOfTags: [{ id: 1, name: 'fn' }],
      notFound
    });
    expect(Update.find('ArticleNotFound').exists()).toBe(true);
  });

  test('update the category', () => {
    const selectedCategory = { target: { name: 'category', value: '2' } };
    Update.instance().addContent(selectedCategory);
    expect(Update.state().article.category).toEqual(2);
  });
});
