import { 
  GET_NOTES, 
  ADD_NOTE, 
  DELETE_NOTE, 
  Notes_LOADING } from '../actions/types';
  
  const initialState = {
    notes: [],
    note_added: false,
    loading: false
  };
  
  export default function(state = initialState, action){
    switch(action.type) {
      case GET_NOTES: 
        return {
          ...state,
          notes: action.payload,
          note_added: false,
          loading: false
        }; 
      case ADD_NOTE: 
        return {
          ...state,
          notes: [action.payload, ...state.notes],
          note_added: true,
        };
      case DELETE_NOTE: 
        return {
          ...state,
          notes: state.notes.filter(note => note._id !== action.payload)
        };
      case Notes_LOADING: 
        return {
          ...state,
          loading: true
        };   
      default:
        return state;
    };
  };