import axios from 'axios';
import { 
  GET_NOTES, 
  ADD_NOTE, 
  DELETE_NOTE, 
  Notes_LOADING 
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get User Notes  
export const getNotes = () => (dispatch, getState) => {
  dispatch(setNotesLoading);
  axios.get('./api/notes', tokenConfig(getState))
    .then(res =>
      dispatch({
          type: GET_NOTES,
          payload: res.data
      }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'GET_NOTE_FAIL')));
};

// Add Note
export const addNote = note => (dispatch, getState) => {
  axios.post('/api/notes', note, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: ADD_NOTE,
        payload: res.data
      }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NOTE_FAIL'))); 

};

// Delete Note
export const deleteNote = id => (dispatch, getState) => {
  axios.delete(`/api/notes/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_NOTE,
        payload: id
      }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_NOTE_FAIL'))); 

};

// before Notes loaded
export const setNotesLoading = () => {
    return {
        type: Notes_LOADING
    };
};