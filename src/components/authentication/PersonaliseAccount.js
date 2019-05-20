import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/PersonaliseAccount.css';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAccount: this.props.location.state,
      username: "",
      bio: ""
    };

    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    console.log(this.state.currentAccount);
  }

  handleCreateAccount(e) {
    e.preventDefault();

    var usernameTextFieldLength = document.getElementById('usernameTextField').value.length;

    if (usernameTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your username.", UI.DialogType.WARNING);
    }
  }

  render() {
    const continueButtonIsEnabled = this.state.username.length !== 0;

    const focusBioTextArea = e => {
      if (e.key === 'Enter') {
        document.getElementById('bioTextArea').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleCreateAccount(e);
      }
    }

    const handleUsernameTextFieldChange = e => {
      this.setState({ username: e.target.value })
    }

    const handleBioTextAreaChange = e => {
      this.setState({ bio: e.target.value });
    }

    return (
      <div className="personalise-account-wrapper">
        <div className="personalise-account-form-container">
          <div className="personalise-account-heading-group">
            <UI.Heading className="personalise-account-heading">Almost there</UI.Heading>
            <UI.Subheading>Let's personalise your profile</UI.Subheading>
          </div>
          <img className="account-icon" src="/assets/account_icon.png" alt="account_icon" height="120" width="120"/>
          <form>
          <div className="personalise-account-form-group">
            <UI.Label htmlFor="form-group">username</UI.Label>
            <UI.TextField id="usernameTextField" name="username" placeholder="Username" value={this.state.username} onChange={handleUsernameTextFieldChange.bind(this)} onKeyPress={focusBioTextArea.bind(this)} noValidate/>
          </div>
          <div className="personalise-account-form-group">
            <UI.Label htmlFor="form-group">bio</UI.Label>
            <UI.TextField id="bioTextArea" name="bio" placeholder="Write a bit about yourself..." value={this.state.bio} onChange={handleBioTextAreaChange.bind(this)} noValidate/>
          </div>
          </form>
          <div className="personalise-account-button-group">
            <UI.Button id="backButton" className="back-button" onClick={() => this.props.history.goBack()}>Back</UI.Button>
            <UI.Button primary id="createAccountButton" className="create-account-button" disabled={!continueButtonIsEnabled} onClick={this.handleCreateAccount}>Continue</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountDetails);