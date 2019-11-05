import { ADD_LIST, CHANGE_ITEM } from './type.js';

let nextId = 0;

export const addList = (text) => {
  return {
    type: ADD_LIST,
    id: nextId++,
    text
  }
}

const changeItem = (text) => {
  return {
    type: CHANGE_ITEM,
    text
  }
}