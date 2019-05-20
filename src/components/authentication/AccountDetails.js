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
      currentAccount: this.props.location.state,
      username: "",
      bio: ""
    };

    console.log(this.state.currentAccount);
  }

  render() {
    const continueButtonIsEnabled = this.state.username.length !== 0;

    const handleUsernameTextFieldChange = e => {
      this.setState({ username: e.target.value })
    }

    const handleBioTextAreaChange = e => {
      this.setState({ bio: e.target.value });
    }

    return (
      <div className="account-details-wrapper">
        <div className="account-details-form-container">
          <div className="account-details-heading-group">
            <UI.Heading className="account-details-heading">Almost there</UI.Heading>
            <UI.Subheading>Let's personalise your profile</UI.Subheading>
          </div>
          <img className="account-icon" src="/assets/account_icon.png" alt="account_icon"/>
          <div className="account-details-form-group">
            {/* <img src="/assets/account_icon.png" alt="account_icon" height="120" width="120"/> */}
            <UI.Label htmlFor="form-group">username</UI.Label>
            <UI.TextField id="usernameTextField" name="username" placeholder="Username" value={this.state.username} onChange={handleUsernameTextFieldChange.bind(this)}/>
          </div>
          <div className="account-details-form-group">
            <UI.Label htmlFor="form-group">bio</UI.Label>
            <UI.TextField id="bioTextArea" name="bio" placeholder="Write a bit about yourself..." value={this.state.bio} onChange={handleBioTextAreaChange.bind(this)}/>
          </div>
          <div className="account-details-button-group">
            {/* <UI.Button id="backButton" className="back-button" onClick={() => this.props.history.goBack()}>Back</UI.Button> */}
            <UI.Button primary id="createAccountButton" className="create-account-button" disabled={!continueButtonIsEnabled}>Continue</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountDetails);