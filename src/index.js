import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import AccountDetails from './components/authentication/AccountDetails';
import Home from './components/main-interface/Home';

const history = createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/account-details" component={AccountDetails}/>
      <Route path="/home" component={Home}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));