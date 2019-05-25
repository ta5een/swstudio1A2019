import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/CreateAccount.css';

const minPasswordLength = Globals.constants.minPasswordLength;

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",

      errorUsername: false,
      errorEmail: false,
      errorPassword: false,
      errorRepeatPassword: false
    };

    this.handleNextButton = this.handleNextButton.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Sign Up`;
  }

  handleNextButton(e) {
    e.preventDefault();

    document.getElementById('nextButton').blur();

    var usernameTextFieldLength = document.getElementById('usernameTextField').value.length;
    var emailTextFieldLength = document.getElementById('emailTextField').value.length;

    if (usernameTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your username.", UI.DialogType.WARNING);
      this.setState({ errorUsername: true });
      document.getElementById('usernameTextField').focus();
    } else if (emailTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your email.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true });
      document.getElementById('emailTextField').focus();
    } else if (!this.passwordMeetsMinLength()) {
      UI.showInfoBox(this, `Passwords must be at least ${minPasswordLength} characters.`, UI.DialogType.WARNING);
      this.setState({ errorPassword: true, errorRepeatPassword: true });
      document.getElementById('passwordTextField').focus();
    } else if (!this.passwordsAreIdentical()) {
      UI.showInfoBox(this, "The passwords you have entered do not match. Please try again.", UI.DialogType.ERROR);
      this.setState({ errorPassword: true, errorRepeatPassword: true });
      document.getElementById('repeatPasswordTextField').focus();
    } else {
      this.commitCreateAccount();
    }
  }

  passwordsAreIdentical() {
    const passwordTextField = document.getElementById('passwordTextField');
    const repeatPasswordTextField = document.getElementById('repeatPasswordTextField');

    return (passwordTextField.value !== "") && (passwordTextField.value === repeatPasswordTextField.value);
  }

  passwordsMeetMinLength() {
    const passwordTextField = document.getElementById('passwordTextField');
    const repeatPasswordTextField = document.getElementById('repeatPasswordTextField');

    return (passwordTextField.value.length >= minPasswordLength) && (repeatPasswordTextField.value.length >= minPasswordLength);
  }

  passwordMeetsMinLength() {
    const passwordTextField = document.getElementById('passwordTextField');
    return passwordTextField.value.length >= minPasswordLength;
  }

  repeatPasswordMeetsMinLength() {
    const repeatPasswordTextField = document.getElementById('repeatPasswordTextField');
    return repeatPasswordTextField.value.length >= minPasswordLength;
  }

  commitCreateAccount() {
    UI.showInfoBox(this, "Setting up your account...");

    fire.auth().fetchSignInMethodsForEmail(this.state.email).then(signInMethods => {
      // If the number of sign in methods is 0, that must mean the user doesn't exist
      var userExists = signInMethods.length > 0;

      if (userExists) {
        UI.showInfoBox(this, "An account with the email you provided already exists.", UI.DialogType.ERROR, { description: "Forgot your password?", page: '/forgot-password' });
      } else {
        this.props.history.push('/personalise-account', { email: this.state.email, password: this.state.password });
      }
    }).catch(error => {
      this.displayAuthError(error);
    });
  }

  displayAuthError(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        UI.showInfoBox(this, "Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", UI.DialogType.ERROR);
        this.setState({ errorEmail: true });
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/email-already-in-use':
        UI.showInfoBox(this, "An account with the email you provided already exists.", UI.DialogType.ERROR, { description: "Forgot your password?", page: '/forgot-password' });
        this.setState({ errorEmail: true });
        document.getElementById('emailTextField').focus();
        break;
      default:
        UI.showInfoBox(this, error.message, UI.DialogType.ERROR);
        return;
    }
  }

  collapseErrorBox() {
    document.getElementById('infoBoxDiv').hidden = true;
    this.setState({ errorUsername: false, errorEmail: false, errorPassword: false, errorRepeatPassword: false });
  }

  showIfPasswordsAreIdentical() {
    if (!this.passwordsAreIdentical()) {
      UI.showInfoBox(this, "Passwords do not match", UI.DialogType.WARNING, { description: "", page: "" });
    } else {
      UI.showInfoBox(this, "Passwords match");
    }
  }

  render() {
    const nextButtonIsEnabled = this.state.email.length >= 3 && this.state.password.length >= minPasswordLength && this.passwordsAreIdentical();

    const focusEmailTextField = e => {
      if (e.key === 'Enter') {
        document.getElementById('emailTextField').focus();
      }
    }

    const focusPasswordTextField = e => {
      if (e.key === 'Enter') {
        document.getElementById('passwordTextField').focus();
      }
    }

    const focusRepeatPasswordTextField = e => {
      if (e.key === 'Enter') {
        document.getElementById('repeatPasswordTextField').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleNextButton(e);
      }
    }

    const handleUsernameTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ username: e.target.value });
    }

    const handleEmailTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ email: e.target.value });
    }

    const handlePasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ password: e.target.value });
      this.showIfPasswordsAreIdentical();
    }

    const handleRepeatPasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ repeatPassword: e.target.value })
      this.showIfPasswordsAreIdentical();
    }

    return (
      <div className="sign-up-wrapper">
        <UI.BackButton to="/role-selection" from={this}/>
        <div className="sign-up-content">
          <div className="sign-up-heading-group">
            <UI.Heading>Almost done</UI.Heading>
            <UI.Subheading>Just fill in the fields below</UI.Subheading>
          </div>
          <form className="sign-up-form">
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorUsername ? "sign-up-error-text-field-label" : null}>username</UI.Label>
              <UI.TextField id="usernameTextField" className={this.state.errorUsername ? "sign-up-error-text-field" : null} name="username" type="text" placeholder="Username" value={this.state.username} onChange={handleUsernameTextFieldChange.bind(this)} onKeyPress={focusEmailTextField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorEmail ? "sign-up-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "sign-up-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordTextField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorPassword ? "sign-up-error-text-field-label" : null}>password</UI.Label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "sign-up-error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={handlePasswordTextFieldChange.bind(this)} onKeyPress={focusRepeatPasswordTextField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorRepeatPassword ? "sign-up-error-text-field-label" : null}>repeat password</UI.Label>
              <UI.TextField id="repeatPasswordTextField" className={this.state.errorRepeatPassword ? "sign-up-error-text-field" : null} name="repeatPassword" type="password" placeholder="Repeat Password" onChange={handleRepeatPasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
            <div id="infoBoxDiv" className="sign-up-info-box-div" hidden={true}/>
          </form>
          <div className="sign-up-create-button-container">
            <UI.Button primary id="nextButton" type="submit" disabled={!nextButtonIsEnabled} onClick={this.handleNextButton}>CREATE ACCOUNT</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateAccount);