import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import noteReducer from './noteReducer';
import itemReducer from './itemReducer';


export default history => combineReducers({
  router: connectRouter(history),
  error: errorReducer,
  auth: authReducer,
  note: noteReducer,
  item: itemReducer,
});
