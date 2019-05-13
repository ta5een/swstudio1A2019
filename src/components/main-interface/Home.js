import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/Home.css';

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
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-header">
            <UI.Heading>Home</UI.Heading>
            <p>Signed in as <b>{fire.auth().currentUser.email}</b></p>
            <UI.Button danger onClick={this.logout}>Logout</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);