import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';
import Start from './components/authentication/Start';
import Login from './components/authentication/existing-account/Login';
import ForgotPassword from './components/authentication/existing-account/ForgotPassword';
import RoleSelection from './components/authentication/new-account/RoleSelection';
import CreateAccount from './components/authentication/new-account/CreateAccount';
import AccountCreated from './components/authentication/new-account/AccountCreated';
import Home from './components/main-interface/Home';

const history = require('history').createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/start" component={Start}/>
      <Route path="/login" component={Login}/>
      <Route path="/forgot-password" component={ForgotPassword}/>
      <Route path="/role-selection" component={RoleSelection}/>
      <Route path="/create-account" component={CreateAccount}/>
      <Route path="/account-created" component={AccountCreated}/>
      <Route path="/home" component={Home}/>
      <Route render={() => <Redirect to="/"/>}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));