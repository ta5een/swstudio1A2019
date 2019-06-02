import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';
import Start from './components/authentication/Start';

import Login from './components/authentication/existing-account/Login';
import ForgotPassword from './components/authentication/existing-account/ForgotPassword';

import LinkSent from './components/authentication/existing-account/LinkSent';
import RoleSelection from './components/authentication/new-account/RoleSelection';
import CreateAccount from './components/authentication/new-account/CreateAccount';
import AccountCreated from './components/authentication/new-account/AccountCreated';

import TabBarView from './components/main-interface/TabBarView';
import CreateEvent from './components/main-interface/Tabs/profile/new-event/CreateEvent';
import DateSelection from './components/main-interface/Tabs/profile/new-event/DateSelection';
import TimeSelection from './components/main-interface/Tabs/profile/new-event/TimeSelection';
import UploadImage from './components/main-interface/Tabs/profile/new-event/UploadImage';
import SubmitAndFinish from './components/main-interface/Tabs/profile/new-event/Submit&Finish';

const history = require('history').createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      {/* Start */}
      <Route exact path="/" component={App}/>
      <Route path="/start" component={Start}/>

      {/* Login */}
      <Route path="/login" component={Login}/>
      <Route path="/forgot-password" component={ForgotPassword}/>

      {/* Sign Up */}
      <Route path="/link-sent" component={LinkSent}/>
      <Route path="/role-selection" component={RoleSelection}/>
      <Route path="/create-account" component={CreateAccount}/>
      <Route path="/account-created" component={AccountCreated}/>

      {/* Main interface */}
      <Route path="/home" render={(props) => <TabBarView {...props} currentIndex={0}/>}/>
      <Route path="/bookings" render={(props) => <TabBarView {...props} currentIndex={1}/>}/>
      <Route path="/favourites" render={(props) => <TabBarView {...props} currentIndex={2}/>}/>
      <Route path="/profile" render={(props) => <TabBarView {...props} currentIndex={3}/>}/>

      {/* Charity Organiser Components */}
      <Route path="/new-event-details" component={CreateEvent}/>
      <Route path="/new-event-date" component={DateSelection}/>
      <Route path="/new-event-time" component={TimeSelection}/>
      <Route path="/new-event-upload-image" component={UploadImage}/>
      <Route path="/new-event-submit" component={SubmitAndFinish}/>

      {/* 404 */}
      <Route render={() => <Redirect to="/"/>}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));