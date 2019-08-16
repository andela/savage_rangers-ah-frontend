import async from 'async';
import axios from '../../configs/axios';
import actions from '.';
import getRating from '../../App/ApiActions/getRating';
import getStat from '../../App/ApiActions/getStatistics';

const {
  GET_PROFILE,
  GET_FOLLOWER,
  GET_FOLLOWING,
  PROFILE_UPDATED,
  GET_BOOKMARK,
  NO_BOOKMARK,
  REMOVE_BOOKMARK,
  UNFOLLOW,
  NO_FOLLOWING,
  FOLLOW,
  DELETE_ARTICLE,
  DELETE_ARTICLE_FAILED,
  GET_PROFILE_FAILED,
  PROFILE_UPDATED_FAILED,
  UNFOLLOW_FAILED,
  FOLLOW_FAILED,
  NO_FOLLOWER
} = actions;

export default {
  getProfile: username => (dispatch) => {
    axios
      .get(`/api/profiles/${username || ''}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then(async (response) => {
        const articles = response.data.profile.Articles;
        async.each(articles,
          async (article, callback) => {
            const rating = await getRating(article.slug);
            const stat = await getStat(article.slug);
            response.data.profile.Articles[articles.indexOf(article)].rating = rating;
            response.data.profile.Articles[articles.indexOf(article)].statistics = stat;
            callback();
          },
          () => {
            dispatch({ type: GET_PROFILE, payload: response.data });
          });
      })
      .catch(() => dispatch({ type: GET_PROFILE_FAILED }));
  },
  getFolowers: username => (dispatch) => {
    axios
      .get(`/api/profiles/follower/${username}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then((followerResponse) => {
        dispatch({ type: GET_FOLLOWER, payload: followerResponse.data });
      })
      .catch(() => dispatch({ type: NO_FOLLOWER }));
  },
  getFollowing: username => (dispatch) => {
    axios
      .get(`/api/profiles/following/${username}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then((followingResponse) => {
        dispatch({ type: GET_FOLLOWING, payload: followingResponse.data });
      })
      .catch(() => {
        dispatch({ type: NO_FOLLOWING });
      });
  },
  updateProfile: profile => async (dispatch) => {
    const {
      country,
      firstName,
      lastName,
      address,
      gender,
      phoneNumber,
      bio,
      profileImage
    } = profile;
    const formData = new FormData();
    formData.append('country', country);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('phoneNumber', phoneNumber);
    formData.append('bio', bio);
    formData.append('profileImage', profileImage);
    axios
      .patch('/api/profiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => dispatch({ type: PROFILE_UPDATED }))
      .catch(() => dispatch({ type: PROFILE_UPDATED_FAILED }));
  },
  getBookMarks: (username, offset) => (dispatch) => {
    axios
      .get(`/api/bookmarks/${username}?offset=${offset || 0}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then(response => dispatch({ type: GET_BOOKMARK, payload: response.data }))
      .catch(() => dispatch({ type: NO_BOOKMARK }));
  },
  removeBookmark: slug => (dispatch) => {
    axios
      .post(`/api/bookmarks/${slug}`,
        {},
        { headers: { Authorization: localStorage.getItem('token') } })
      .then(response => dispatch({ type: REMOVE_BOOKMARK, payload: response.data.message }));
  },
  unfollow: username => (dispatch) => {
    axios
      .delete(`/api/profiles/${username}/unfollow`, { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: UNFOLLOW, payload: response.data });
      })
      .catch(() => dispatch({ type: UNFOLLOW_FAILED }));
  },
  follow: username => (dispatch) => {
    axios
      .post(`/api/profiles/${username}/follow`,
        {},
        { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: FOLLOW, payload: response.data });
      })
      .catch(() => dispatch({ type: FOLLOW_FAILED }));
  },
  deleteArticle: slug => (dispatch) => {
    axios
      .delete(`/api/articles/${slug}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then(() => dispatch({ type: DELETE_ARTICLE }))
      .catch((err) => {
        dispatch({ type: DELETE_ARTICLE_FAILED, payload: err.response });
      });
  }
};
