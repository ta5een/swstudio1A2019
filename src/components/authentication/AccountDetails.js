import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/AccountDetails.css';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  render() {
    const handleUsernameTextFieldChange = e => {
      this.setState({ username: e.target.value })
    }

    return (
      <div className="account-details-wrapper">
        <div className="account-details-form-container">
          <div className="account-details-heading-group">
            <UI.Heading className="account-details-heading">Almost there</UI.Heading>
            <UI.Subheading>Let's personalise your profile</UI.Subheading>
          </div>
          <div className="account-details-form-group">
            <UI.Label htmlFor="form-group">username</UI.Label>
            <UI.TextField id="usernameTextField" name="username" placeholder="Username" value={this.state.username} onChange={handleUsernameTextFieldChange.bind(this)}/>
          </div>
          <div className="account-details-button-group">
            <UI.Button id="backButton" className="back-button" onClick={() => this.props.history.goBack()}>Back</UI.Button>
            <UI.Button primary id="createAccountButton" className="create-account-button">Create Account</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountDetails);