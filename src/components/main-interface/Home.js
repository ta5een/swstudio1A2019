import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/Home.css';

import SimpleBottomNavigation from './SimpleBottomNavigation';
// import TitlebarGridList from './TitlebarGridList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: ""
    });

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.title = `${AppDefaults.app.name} – Home`;
    const user = fire.auth().currentUser;

    if (!user) {
      this.props.history.push('/login');
    } else {
      this.setState({ user });
    }
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
            <p>Signed in as <b>{this.state.user.email}</b></p>
            <UI.Button danger onClick={this.logout}>Logout</UI.Button>
            <SimpleBottomNavigation></SimpleBottomNavigation>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);