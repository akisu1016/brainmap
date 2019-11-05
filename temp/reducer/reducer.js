import { ADD_LIST, CHANGE_ITEM } from '../action/type.js';

const initialState = {
  id: 0,
  text: ''
}

 export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST:
      return { 
        id: action.id, 
        text: action.text 
      }
    default:
      return state;
  }
}