import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';
import Start from './components/authentication/Start';
import Login from './components/authentication/Login';
import CreateAccount from './components/authentication/CreateAccount';
import ForgotPassword from './components/authentication/ForgotPassword';
import PersonaliseAccount from './components/authentication/PersonaliseAccount';
import Home from './components/main-interface/Home';

const history = require('history').createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/start" component={Start}/>
      <Route path="/login" component={Login}/>
      <Route path="/create-account" component={CreateAccount}/>
      <Route path="/forgot-password" component={ForgotPassword}/>
      <Route path="/personalise-account" component={PersonaliseAccount}/>
      <Route path="/home" component={Home}/>
      <Route render={() => <Redirect to="/"/>}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));