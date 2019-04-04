import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, ITEM_ADDED, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get User Items  
export const getItems = note_id => (dispatch, getState) => {
  dispatch(setItemsLoading);
  axios.get(`./api/items/${note_id}`, tokenConfig(getState))
  .then(res =>
    dispatch({
        type: GET_ITEMS,
        payload: res.data,
        note_id: note_id
    }))
  .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'GET_NOTE_FAIL')));

};

// Add Item
export const addItem = item => (dispatch, getState) => {
  axios.post(`./api/items/${item.note}`, item, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'ADD_ITEM_FAIL')))
};

// Item added
export const itemAdded = () => {
  return {
    type: ITEM_ADDED
  };
};

// Check/Uncheck Item
export const checkItem = item => (dispatch) => {

};

// Delete Item
export const deleteItem = id => (dispatch) => {

};

// before Items loaded
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};