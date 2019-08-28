import getArticleReducer from '../../../../Redux/Reducers/getArticleReducer';
import types from '../../../../Redux/Actions';

const {
  GET_ARTICLE,
  GET_ARTICLE_TAGS,
  ARTICLE_NOT_FOUND,
  ARTICLE_TAGS_NOT_FOUND,
  GET_DRAFTED_ARTICLE
} = types;
describe('Get article Reducer', () => {
  test('should get article', () => {
    const getArticle = getArticleReducer({}, { type: GET_ARTICLE, payload: { body: 'let make it great' } });
    expect(getArticle).toEqual({ article: { body: 'let make it great' } });
  });

  test('Get tags reducer', () => {
    const getArticleTags = getArticleReducer({}, { type: GET_ARTICLE_TAGS, payload: { tags: ['jest', 'fn'] } });
    expect(getArticleTags).toEqual({ tags: { tags: ['jest', 'fn'] } });
  });

  test('Article not found reducer', () => {
    const articleNotFound = getArticleReducer({}, { type: ARTICLE_NOT_FOUND, payload: { message: 'article not found' } });
    expect(articleNotFound).toEqual({ notFound: { message: 'article not found' } });
  });

  test('Tags not found reducer', () => {
    const TagsNotFound = getArticleReducer({}, { type: ARTICLE_TAGS_NOT_FOUND, payload: { error: 'tags not found' } });
    expect(TagsNotFound).toEqual({ noTags: { error: 'tags not found' } });
  });

  test('should get article', () => {
    const getDraftedArticle = getArticleReducer({}, { type: GET_DRAFTED_ARTICLE, payload: { body: 'let make it great' } });
    expect(getDraftedArticle).toEqual({ article: { body: 'let make it great' } });
  });
});
