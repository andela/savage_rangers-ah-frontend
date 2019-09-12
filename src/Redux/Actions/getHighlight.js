import actions from '.';
import axios from '../../configs/axios';

export default slug => async (dispatch) => {
  try {
    const { data: highlighted } = await axios.get(`/api/articles/${slug}/highlight`);
    dispatch({
      type: actions.FETCH_HIGHLIGHT_SUCCESS,
      payload: { highlighted }
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: actions.GET_HIGHLIGHT_FAIL, payload: { data } });
  }
};
