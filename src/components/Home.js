import React, { Component } from 'react';

import fire from '../config/Fire';
import AppDefaults from '../AppDefaults';
import * as UI from '../controls/UI';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.title = `${AppDefaults.app.name} – Home`;
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-header">
            <UI.H1>Home</UI.H1>
            <UI.Button danger onClick={this.logout}>Logout</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;