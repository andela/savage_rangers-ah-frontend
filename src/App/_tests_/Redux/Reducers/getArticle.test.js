import getArticleReducer from '../../../../Redux/Reducers/getArticleReducer';
import types from '../../../../Redux/Actions';

const { GET_ARTICLE, GET_ARTICLE_TAGS } = types;
describe('Get article Reducer', () => {
  test('should get article', () => {
    const getArticle = getArticleReducer({}, { type: GET_ARTICLE, payload: { body: 'let make it great' } });
    expect(getArticle).toEqual({ article: { body: 'let make it great' } });
  });

  test('should get tags', () => {
    const getArticle = getArticleReducer({}, { type: GET_ARTICLE_TAGS, payload: { tags: ['jest', 'fn'] } });
    expect(getArticle).toEqual({ tags: { tags: ['jest', 'fn'] } });
  });
});
