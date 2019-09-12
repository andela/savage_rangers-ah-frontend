import Actions from '../Actions/index';

const { REPORT_ARTICLE, REPORT_ARTICLE_ERROR } = Actions;

export default (state = { reportData: null, reportError: null }, action) => {
  switch (action.type) {
    case REPORT_ARTICLE:
      return { ...state, reportData: action.reportData, reportError: null };
    case REPORT_ARTICLE_ERROR:
      return { ...state, reportError: action.reportError, reportData: null };
    default:
      return state;
  }
};
