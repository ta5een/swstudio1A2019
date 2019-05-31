import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import { attemptGetCurrentUser } from './config/Fire';
import './App.css';

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
        <div className="app-content">
          <img className="app-icon" src="/assets/app_icon.png" alt="Time-Aid"/>
          <PulseLoader color={'#9492A0'} size={12} margin={'7px'}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);