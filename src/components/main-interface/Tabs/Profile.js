import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import fire, { attemptGetCurrentUser } from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: null,
      isCharityOrg: false
    });

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Profile`;

    attemptGetCurrentUser(10)
      .then(user => {
        const charitiesDocRef = fire.firestore().doc('charities/' + user.uid);
        charitiesDocRef.get()
          .then(doc => this.setState({ user, isCharityOrg: doc.exists }))
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/login?kicked-out=yes');
      });
  }

  handleLogout() {
    console.log("Logging out...");

    fire.auth().signOut()
      .then(() => {
        console.log("Successfully signed out. Redirecting...");
        this.props.history.push('/start');
      })
      .catch((error) => console.log(error));
  }

  render() {
    const loadingView = () => {
      const globalColours = require('../../../Globals').default.constants.styles.colours

      return (
        <div className="profile-loading-container">
          <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
        </div>
      );
    }

    const contentView = () => {
      return (
        <div className="profile-content-container">
          <div>
            <UI.Heading style={{ margin: "0px" }}>{this.state.user.displayName}</UI.Heading>
            <UI.Subheading>{this.state.user.email}</UI.Subheading>
          </div>
          {this.state.isCharityOrg ? <UI.Button>ADD EVENT</UI.Button> : null}
          <UI.Button danger onClick={() => this.handleLogout()}>LOG OUT</UI.Button>
        </div>
      );
    }

    return (
      <div className="profile-wrapper">
        <div className="profile-title-bar">
          <UI.TitleBar title="Profile"/>
        </div>
        <div className="profile-body">
          {this.state.user ? contentView() : loadingView()}
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);