import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from './config/Fire';
import './App.css';

const wait = ms => new Promise(callback => setTimeout(callback, ms));

const retryOperation = (fn, times, delay) => {
  return new Promise((resolve, reject) => {
    return fn()
      .then(resolve)
      .catch(reason => {
        if (times - 1 > 0) {
          return wait(delay)
            .then(retryOperation.bind(null, fn, times - 1, delay))
            .then(resolve)
            .catch(reject);
        }

        return reject(reason);
      });
  })
}

const maximumAttempts = 10;

const getCurrentUser = () => new Promise((resolved, rejected) => {
  let currentUser = fire.auth().currentUser;
  if (currentUser) {
    console.log("Found user!");
    return resolved(currentUser);
  } else {
    console.log("Unable to resolve current user. Trying again...");
    return rejected("Timeout – Failed to get current user on time.");
  }
});

export const attemptGetCurrentUser = (attempts=maximumAttempts) => {
  return retryOperation(getCurrentUser, attempts, 1000);
}

class App extends Component {
  componentDidMount() {
    attemptGetCurrentUser()
      .then(user => {
        console.log("Currently signed-in user: " + user.uid);
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/start');
      });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app-contents">
          <img className="app-icon" src="/assets/app_icon.png" alt="Time-Aid"/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);