import highlightReducer from '../../../../Redux/Reducers/highlight';
import actions from '../../../../Redux/Actions';

describe('Highlight Reducer', () => {
  it('POST_HIGHLIGHT_SUCCESS reducer', () => {
    const initialState = {
      errors: {},
      highlights: []
    };
    expect(highlightReducer(initialState, {
      type: actions.POST_HIGHLIGHT_SUCCESS,
      payload: {
        errors: {},
        highlighted: { highlighted: {} }
      }
    })).toEqual({
      errors: {},
      highlights: [{}]
    });
  });
  it('FETCH_HIGHLIGHT_SUCCESS reducer', () => {
    const initialState = {
      errors: {},
      highlights: []
    };
    expect(highlightReducer(initialState, {
      type: actions.FETCH_HIGHLIGHT_SUCCESS,
      payload: {
        errors: {},
        highlighted: { highlighted: {} }
      }
    })).toEqual({
      errors: {},
      highlights: {}
    });
  });
  it('FETCH_HIGHLIGHT_SUCCESS reducer', () => {
    const initialState = {
      errors: {},
      highlights: []
    };
    expect(highlightReducer(initialState, {
      type: actions.FETCH_HIGHLIGHT_FAIL,
      payload: {
        errors: {},
        highlighted: { highlighted: {} }
      }
    })).toEqual({
      errors: {},
      highlights: []
    });
  });
});
