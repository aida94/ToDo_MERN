import axios from 'axios';
import { push } from 'connected-react-router';
import { returnErrors } from './errorActions'; 
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, EMPTY_NOTES, EMPTY_ITEMS, GOOGLE_OAUTH, FACEBOOK_OAUTH } from './types';


// Check token & load user
export const loadUser = () => async (dispatch, getState) => { 
  // User loading
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get('http://localhost:5000/api/auth/user', tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: res.data.user });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};


// Register User
export const register = ({ username, email, password }) => async (dispatch) => {
  // Headers
  const config = { headers: { 'Content-type': 'application/json' } };
  // Request body 
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.user, token: res.data.token });
    // redirect to home when register if you are in other url
    dispatch(push('/'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({ type: REGISTER_FAIL });
  }
};
 

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  // Headers
  const config = { headers: { 'Content-type': 'application/json' } };
  // Request body 
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user, token: res.data.token });
    // redirect to home when login if you are in other url
    dispatch(push('/'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({ type: LOGIN_FAIL });
  }
};


// Google OAUTH
export const googleOauth = data => async (dispatch) => {
  // Headers
  const config = { headers: { 'Content-type': 'application/json' } };
  // Request body 
  const body = JSON.stringify({ access_token: data });

  try {
    const res = await axios.post('http://localhost:5000/api/auth/google', body, config);
    dispatch({ type: GOOGLE_OAUTH, payload: res.data.user, token: res.data.token });
    // redirect to home when login if you are in other url
    dispatch(push('/'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({ type: LOGIN_FAIL });
  }
};


// Facebook OAUTH
export const facebookOauth = data => async (dispatch) => {
  // Headers
  const config = { headers: { 'Content-type': 'application/json' } };
  // Request body 
  const body = JSON.stringify({ access_token: data });

  try {
    const res = await axios.post('http://localhost:5000/api/auth/facebook', body, config);
    dispatch({ type: FACEBOOK_OAUTH, payload: res.data.user, token: res.data.token });
    // redirect to home when login if you are in other url
    dispatch(push('/'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({ type: LOGIN_FAIL });
  }
};


// Logout User
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch({ type: EMPTY_NOTES });
  dispatch({ type: EMPTY_ITEMS });
};


// Setup config/headers and token
export const tokenConfig = (getState) => {
  // get token form localStorage
  const { token } = getState().auth;
  // Headers
  const config = { headers: { 'Content-type': 'application/json' } };

  // if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
