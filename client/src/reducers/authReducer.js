import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, GOOGLE_OAUTH, FACEBOOK_OAUTH } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING: 
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED: 
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS: 
    case REGISTER_SUCCESS: 
    case GOOGLE_OAUTH:
    case FACEBOOK_OAUTH:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR: 
    case LOGIN_FAIL: 
    case LOGOUT_SUCCESS: 
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };   
    default:
      return state;
  }
}
