import types from '.';

const { CREATE_ARTICLE } = types;

export default{
  changeState: data  => dispatch => {
    dispatch({type: CREATE_ARTICLE, article: data})
  }
}