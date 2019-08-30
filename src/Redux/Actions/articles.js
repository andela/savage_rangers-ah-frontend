import types from './index';
import axios from '../../configs/axios';

const {
  CREATE_ARTICLE,
  CHANGE_STATE,
  CREATE_ARTICLE_ERROR,
  AUTO_SAVE,
  GET_CATEGORIES,
  GET_TAGS,
  PUBLISH_ARTICLE
} = types;
const token = localStorage.getItem('token');

export const createArticle = data => dispatch => new Promise((resolve, reject) => axios
  .post('/api/articles', { ...data }, { headers: { Authorization: token } })
  .then((res) => {
    resolve(dispatch({ type: CREATE_ARTICLE, payload: res.data }));
  })
  .catch(() => {
    reject(reject(dispatch({
      type: CREATE_ARTICLE_ERROR,
      payload: "Ooop..failed to create the article.Don't wory keep on typing"
    })));
  }));

export const drafting = data => dispatch => new Promise((resolve, reject) => {
  axios
    .patch(`/api/articles/${data.slug}`, { ...data }, { headers: { Authorization: token } })
    .then((res) => {
      resolve(dispatch({ type: AUTO_SAVE, payload: res.data.message }));
    })
    .catch(() => {
      reject(dispatch({
        type: CREATE_ARTICLE_ERROR,
        payload: "Ooop..failed to update the article.Don't wory keep on typing"
      }));
    });
});

export const publish = data => dispatch => new Promise((resolve, reject) => {
  axios
    .patch(`/api/articles/${data.slug}/publish`,
      { ...data },
      { headers: { Authorization: token } })
    .then((res) => {
      resolve(dispatch({ type: PUBLISH_ARTICLE, payload: res.data.message }));
    })
    .catch(() => reject("Ooops, can't publish at the moment, try again in a minute"));
});

export const categories = () => (dispatch) => {
  axios
    .get('/api/categories')
    .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data.categories }));
};

export const getTags = () => (dispatch) => {
  axios.get('/api/tags').then(res => dispatch({ type: GET_TAGS, payload: res.data.tags }));
};
export const changeState = data => (dispatch) => {
  dispatch({ type: CHANGE_STATE, payload: data });
};
