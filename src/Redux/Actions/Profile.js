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
  NO_BOOKMARK
} = actions;

export default {
  getProfile: () => (dispatch) => {
    axios
      .get('/api/profiles/Burindi', { headers: { Authorization: localStorage.getItem('token') } })
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
      });
  },
  getFolowers: () => (dispatch) => {
    axios
      .get('/api/profiles/follower', { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: GET_FOLLOWER, payload: response.data });
      })
      .catch(error => error);
  },
  getFollowing: () => (dispatch) => {
    axios
      .get('/api/profiles/following', { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: GET_FOLLOWING, payload: response.data });
      })
      .catch(error => error);
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
    axios({
      method: 'patch',
      url: '/api/profiles',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token')
      }
    })
      .then(() => dispatch({ type: PROFILE_UPDATED }))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error.response));
  },
  getBoooMarks: () => (dispatch) => {
    axios
      .get('/api/bookmarks/', { headers: { Authorization: localStorage.getItem('token') } })
      .then(response => dispatch({ type: GET_BOOKMARK, payload: response.data }))
      .catch(() => dispatch({ type: NO_BOOKMARK }));
  }
};
