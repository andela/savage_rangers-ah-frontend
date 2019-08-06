import axios from '../../../configs/axios';
import actions from '.';

const { CREATE_ARTICLE, GET_TAGS } = actions;


export const getTags = () => dispatch => (axios
  .get('https://authors-heaven.herokuapp.com/api/articles/How-to-create-sequalize-seeds/tags')
  .then(res => dispatch({ type: GET_TAGS, payload: res.data.data }))
);

export default {
  newArticle: data => dispatch => axios
    .post('https//:erhttps://authors-heaven.herokuapp.com/api/articles', { ...data })
    .then((response) => {
      const { article } = response.data;
      dispatch({ actions: CREATE_ARTICLE, data: article });
    })
};
