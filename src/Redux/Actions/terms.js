import actions from '.';
import axios from '../../configs/axios';

export default () => async (dispatch) => {
  const { data } = await axios.get('/api/termsAndConditions/1');
  const { termsDocument: { termsAndConditions } } = data;
  dispatch({
    type: actions.FETCH_TERMS,
    payload: { termsAndConditions }
  });
};
