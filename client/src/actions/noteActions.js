import axios from 'axios';
import { GET_NOTES, ADD_NOTE, NOTE_ADDED, DELETE_NOTE, NOTES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get User Notes  
export const getNotes = () => (dispatch, getState) => {
  dispatch(setNotesLoading);
  axios.get('http://localhost:5000/api/notes', tokenConfig(getState))
    .then(res => dispatch({
      type: GET_NOTES,
      payload: res.data,
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'GET_NOTE_FAIL')));
};

// Add Note
export const addNote = note => (dispatch, getState) => {
  axios.post('http://localhost:5000/api/notes', note, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_NOTE,
      payload: res.data,
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NOTE_FAIL'))); 
};

// Note added
export const noteAdded = () => {
  return {
    type: NOTE_ADDED,
  };
};

// Delete Note
export const deleteNote = id => (dispatch, getState) => {
  axios.delete(`http://localhost:5000/api/notes/${id}`, tokenConfig(getState))
    .then(res => dispatch({
      type: DELETE_NOTE,
      payload: id,
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_NOTE_FAIL'))); 
};

// before Notes loaded
export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING,
  };
};
