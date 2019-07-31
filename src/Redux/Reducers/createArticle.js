import types from '../Actions';

const { CREATE_ARTICLE, CHANGE_STATE } = types;
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return action.article;
    case CHANGE_STATE:
        return action.article;
    default:
      return state;
  }
};