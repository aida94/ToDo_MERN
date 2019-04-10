import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, ITEM_ADDED, ITEMS_LOADING, SHOW_NOTE } from './types';
import { tokenConfig } from './authActions';
import { getNotes } from './noteActions';
import { returnErrors } from './errorActions';


// before Items loaded
export const setItemsLoading = () => {
  return { type: ITEMS_LOADING };
};


// Show Note
export const showNote = (id) => {
  return { type: SHOW_NOTE, payload: id };
};


// Get User Items  
export const getItems = noteId => async (dispatch, getState) => {
  dispatch(setItemsLoading);
  dispatch(getNotes());

  try {
    const res = await axios.get(`http://localhost:5000/api/items/${noteId}`, tokenConfig(getState));
    dispatch({ type: GET_ITEMS, payload: res.data.items });
    dispatch(showNote(noteId));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ITEMS_FAIL'));
  }
};


// Add Item
export const addItem = item => (dispatch, getState) => {
  axios.post(`http://localhost:5000/api/items/${item.note}`, item, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_ITEM,
      payload: res.data,
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'ADD_ITEM_FAIL')));
};

// Item added
export const itemAdded = () => {
  return {
    type: ITEM_ADDED,
  };
};

// Check/Uncheck Item
export const checkItem = item => (dispatch) => {

};

// Delete Item
export const deleteItem = id => (dispatch) => {

};
