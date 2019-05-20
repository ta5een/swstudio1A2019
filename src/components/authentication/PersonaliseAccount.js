import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import * as UI from '../../controls/UI';
import './styles/PersonaliseAccount.css';

class PersonaliseAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAccount: this.props.location.state,
      username: "",
      bio: "",
      didSuccessfullyCreateAccount: false
    };

    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    console.log(this.state.currentAccount);
  }

  handleCreateAccount(e) {
    e.preventDefault();

    var usernameTextFieldLength = document.getElementById('usernameTextField').value.length;

    if (usernameTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your username.", UI.DialogType.WARNING);
    } else {
      this.commitCreateAccount();
    }
  }

  commitCreateAccount() {
    UI.showInfoBox(this, "Creating account...");

    var username = document.getElementById('usernameTextField').value;

    const userEmail = this.state.currentAccount.email;
    const userPassword = this.state.currentAccount.password;

    fire.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(() => {
      const currentUser = fire.auth().currentUser;
      currentUser.sendEmailVerification();
      currentUser.updateProfile({ displayName: username }).then(() => {
        this.setState({ didSuccessfullyCreateAccount: true });
      }).catch(error => {
        UI.showInfoBox(this, error.message, UI.DialogType.ERROR);
      });
    }).catch(error => {
      UI.showInfoBox(this, error.message, UI.DialogType.ERROR);
    });
  }

  renderPersonalisationForm() {
    const continueButtonIsEnabled = this.state.username.length !== 0;

    const focusBioTextArea = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('bioTextArea').focus();
      }
    }

    const handleUsernameTextFieldChange = e => {
      this.setState({ username: e.target.value })
    }

    const handleBioTextAreaChange = e => {
      this.setState({ bio: e.target.value });
    }

    return (
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
          <UI.TextArea id="bioTextArea" name="bio" placeholder="Write a bit about yourself..." rows={5} value={this.state.bio} onChange={handleBioTextAreaChange.bind(this)} noValidate/>
        </div>
        </form>
        <div id="infoBoxDiv" className="personalise-account-info-box-div" hidden={true}/>
        <div className="personalise-account-button-group">
          <UI.Button id="backButton" className="back-button" onClick={() => this.props.history.push('/sign-up')}>Back</UI.Button>
          <UI.Button primary id="createAccountButton" className="create-account-button" disabled={!continueButtonIsEnabled} onClick={this.handleCreateAccount}>Continue</UI.Button>
        </div>
      </div>
    );
  }

  renderSuccessMessage() {
    return (
      <div className="personalise-account-form-container">
        <div className="personalise-account-heading-group">
          <UI.Heading className="personalise-account-heading">All done <span role="img" aria-label="Smiley Face">😃</span></UI.Heading>
          <UI.Subheading>You're new account has been created! Let's take a short tour to get started.</UI.Subheading>
        </div>
        <div className="personalise-account-button-group">
          <UI.Button id="goToHomeButton" className="go-to-home-button" onClick={() => this.props.history.push('/home')}>No thanks, take me home</UI.Button>
          <UI.Button primary id="takeTourButton" className="take-tour-button" onClick={() => this.props.history.push('/home')}>Let's go!</UI.Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="personalise-account-wrapper">
        {this.state.didSuccessfullyCreateAccount ? this.renderSuccessMessage() : this.renderPersonalisationForm()}
      </div>
    );
  }
}

export default withRouter(PersonaliseAccount);