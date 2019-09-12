import actions from '.';
import axios from '../../configs/axios';

const token = localStorage.getItem('token');
export default (formData, slug) => async (dispatch) => {
  try {
    const { data: highlighted } = await axios.post(`/api/articles/${slug}/highlight`, formData, { headers: { Authorization: token } });
    dispatch({
      type: actions.POST_HIGHLIGHT_SUCCESS,
      payload: { highlighted }
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: actions.POST_HIGHLIGHT_FAIL, payload: { data } });
  }
};
