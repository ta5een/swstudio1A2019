import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from './config/Fire';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.attemptToGetCurrentUser();
  }

  attemptToGetCurrentUser() {
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

    const getCurrentUser = () => new Promise((resolved, rejected) => {
      let currentUser = fire.auth().currentUser;
      if (currentUser) {
        console.log("Found user!");
        return resolved(currentUser);
      } else {
        console.log("Unable to resolve current user. Trying again...");
        return rejected();
      }
    });

    const maximumAttempts = 3;

    retryOperation(getCurrentUser, maximumAttempts, 1000)
      .then(user => {
        console.log("Currently signed-in user: " + user.uid);
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        this.props.history.push('/home');
      })
      .catch(() => {
        console.log("Timeout: No user signed in");
        this.setState({ user: null });
        localStorage.removeItem('user');
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