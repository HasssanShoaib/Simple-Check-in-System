import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import rootReducer from './modules/rootReducer';

export const history = createHistory();
const routingMiddleware = routerMiddleware(history);

export default createStore(
  rootReducer,
  {},
  applyMiddleware(thunk, routingMiddleware)
);
