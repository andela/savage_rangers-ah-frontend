import actions from '../Actions/index';


const { GET_TAGS, CREATE_ARTICLE } = actions;

export default (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_TAGS:
      return { articleTags: action.payload };
    case CREATE_ARTICLE:
      return {
        ...state,
        newArticle: action.data
      };
    default:
      return state;
  }
};
