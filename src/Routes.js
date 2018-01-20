import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Child,
  ChildGroup,
  Login,
  NotFound,
  PrivateRoute
} from './containers';

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <PrivateRoute path="/child/:id" redirectTo="/" component={Child}/>
      <PrivateRoute path="/childGroup" redirectTo="/" component={ChildGroup}/>      
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Routes;