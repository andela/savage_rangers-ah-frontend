import types from '../Actions';

const { GET_CATEGORIES } = types;

export default (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.state;
    default:
      return state;
  }
};
