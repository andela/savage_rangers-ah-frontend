import actions from "../Actions";

const { GET_WELCOME } = actions;

const initialState = {
  data: {},
};

/**  
 * the data is in the action object in my case i 
*passed it as payload in my getWelcome action when dispatching
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WELCOME:        
      return {
          ...state,
          data: action.payload.data
      };
    default:
      return state;
  }
};
