import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import children from './children';
import errorMessage from './errorMessage';

export default combineReducers({
  auth,
  children,
  errorMessage,
  routing: routerReducer
});