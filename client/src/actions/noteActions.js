import axios from 'axios';
import { GET_NOTES, ADD_NOTE, NOTE_ADDED, DELETE_NOTE, NOTES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


// before Notes loaded
export const setNotesLoading = () => {
  return { type: NOTES_LOADING };
};


// Get User Notes  
export const getNotes = () => async (dispatch, getState) => {
  dispatch(setNotesLoading);

  try {
    const res = await axios.get('http://localhost:5000/api/notes', tokenConfig(getState));
    dispatch({ type: GET_NOTES, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_NOTES_FAIL'));
  }
};


// Add Note
export const addNote = note => async (dispatch, getState) => {
  try {
    const res = await axios.post('http://localhost:5000/api/notes', note, tokenConfig(getState));
    dispatch({ type: ADD_NOTE, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NOTE_FAIL'));
  }
};


// Note added
export const noteAdded = () => {
  return { type: NOTE_ADDED };
};


// Delete Note
export const deleteNote = id => async (dispatch, getState) => {
  try {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_NOTE, payload: id });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_NOTE_FAIL'));
  }  
};
