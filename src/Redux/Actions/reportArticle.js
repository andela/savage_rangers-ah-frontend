import axios from '../../configs/axios';
import Actions from '.';


const { REPORT_ARTICLE, REPORT_ARTICLE_ERROR } = Actions;
export default {
  reportArticle: (slug, reason, token) => (dispatch) => {
    axios
      .post(`/api/articles/${slug}/report`, { reason }, { headers: { authorization: token } })
      .then((res) => {
        dispatch({ type: REPORT_ARTICLE, reportData: res.data.message });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors.Message;
        dispatch({ type: REPORT_ARTICLE_ERROR, reportError: errorObject });
      });
  }
};
