import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './redux/store';

import {
  Child,
  ChildGroup,
  Login,
  NotFound,
  PrivateRoute
} from './containers';

const Routes = (props) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <PrivateRoute path="/child/:id" redirectTo="/" component={Child}/>
      <PrivateRoute path="/childGroup" redirectTo="/" component={ChildGroup}/>      
      <Route path="*" component={NotFound} />
    </Switch>
  </ConnectedRouter>
)

export default Routes;