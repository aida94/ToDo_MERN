import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, ITEM_ADDED, ITEMS_LOADING, FILTER_ITEMS, SHOW_NOTE, DELETE_ITEM } from './types';
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
export const getItems = () => async (dispatch, getState) => {
  dispatch(setItemsLoading);
  dispatch(getNotes());

  try {
    const res = await axios.get(`http://localhost:5000/api/items/${noteID(getState)}`, tokenConfig(getState));
    dispatch({ type: GET_ITEMS, payload: res.data.items });
    dispatch(showNote(noteID(getState)));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ITEMS_FAIL'));
  }
};

// Get User Items  
export const getNoteItems = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('http://localhost:5000/api/items', tokenConfig(getState));
    dispatch({ type: GET_ITEMS, payload: res.data.items });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ITEMS_FAIL'));
  }
};


// Add Item
export const addItem = item => async (dispatch, getState) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/items/${noteID(getState)}`, item, tokenConfig(getState));
    dispatch({ type: ADD_ITEM, payload: res.data.item });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'ADD_ITEM_FAIL'));
  }
};


// Item added
export const itemAdded = () => {
  return { type: ITEM_ADDED };
};


// Check/Uncheck Item
export const checkItem = id => async (dispatch, getState) => {
  try {
    await axios.put(`http://localhost:5000/api/items/${id}`, tokenConfig(getState));
    dispatch(getItems(noteID(getState)));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CHECK_ITEM_FAIL'));
  }
};


// Filter Items
export const filterItem = filter => async (dispatch, getState) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/items/${noteID(getState)}`, tokenConfig(getState));
    dispatch({ type: FILTER_ITEMS, payload: res.data.items, filter });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'FILTER_FAIL'));
  } 
};


// Delete Item
export const deleteItem = id => async (dispatch, getState) => {
  try {
    await axios.delete(`http://localhost:5000/api/items/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_ITEM_FAIL'));
  } 
};


// get noteId from url and use it for your call
export const noteID = (getState) => {
  const { pathname } = getState().router.location;
  const pathnameUrl = pathname.split('/');
  const noteId = pathnameUrl.pop();
  return noteId;
};
