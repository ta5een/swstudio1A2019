import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

import './index.css';

const history = createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/home" component={Home}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));