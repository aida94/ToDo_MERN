import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import noteReducer from './noteReducer';
import itemReducer from './itemReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  note: noteReducer,
  item: itemReducer,
});
