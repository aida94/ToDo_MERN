import { GET_NOTES, ADD_NOTE, NOTE_ADDED, SHOW_NOTE, DELETE_NOTE, NOTES_LOADING, EMPTY_NOTES } from '../actions/types';
  
const initialState = {
  notes: [],
  note_added: false,
  loading: false,
};
  
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTES: 
      return {
        ...state,
        notes: action.payload,
        loading: false,
      }; 
    case ADD_NOTE: 
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        note_added: true,
      };
    case NOTE_ADDED: 
      return {
        ...state,
        note_added: false,
      };
    case SHOW_NOTE: 
      return {
        ...state,
        notes: state.notes.filter(note => note._id === action.payload),
      };
    case DELETE_NOTE: 
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload),
      };
    case NOTES_LOADING: 
      return {
        ...state,
        loading: true,
      }; 
    case EMPTY_NOTES: 
      return {
        notes: [],
        note_added: false,
        loading: false,
      };  
    default:
      return state;
  }
}
