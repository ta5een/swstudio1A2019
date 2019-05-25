import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import Globals from '../../Globals';
import * as UI from '../../controls/UI';
import './styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: ""
    });

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Home`;
    const user = fire.auth().currentUser;

    if (!user) {
      this.props.history.push('/login');
    } else {
      this.setState({ user });
    }
  }

  logout() {
    fire.auth().signOut();
    this.props.history.push('/start');
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-header">
            <UI.Heading>Home</UI.Heading>
            <p>Hi, {this.state.user.displayName}!</p>
            <p>Signed in as <b>{this.state.user.email}</b>, your uid is {this.state.user.uid}</p>
            <UI.Button danger onClick={this.logout}>Logout</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);