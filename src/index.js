import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import ForgotPassword from './components/authentication/ForgotPassword';
import AccountDetails from './components/authentication/AccountDetails';
import Home from './components/main-interface/Home';

const history = require('history').createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/forgot-password" component={ForgotPassword}/>
      <Route path="/account-details" component={AccountDetails}/>
      <Route path="/home" component={Home}/>
      <Route component={Login}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));