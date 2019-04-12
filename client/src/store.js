import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';


const initialState = {};
const middleware = [thunk];

export const history = createBrowserHistory();

export const store = createStore(createRootReducer(history), initialState, compose(
  applyMiddleware(...middleware, routerMiddleware(history)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
));
