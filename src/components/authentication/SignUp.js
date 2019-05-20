import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/SignUp.css';

const minPasswordLength = AppDefaults.constants.minPasswordLength;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
      errorEmail: false,
      errorPassword: false,
      errorRepeatPassword: false
    };

    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  componentDidMount() {
    document.title = `${AppDefaults.app.name} – Sign Up`;
  }

  handleCreateAccount(e) {
    e.preventDefault();

    document.getElementById('nextButton').blur();

    var emailTextFieldLength = document.getElementById('emailTextField').value.length;

    if (emailTextFieldLength === 0) {
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
    UI.showInfoBox(this, "Creating account...");

    fire.auth().fetchSignInMethodsForEmail(this.state.email).then((signInMethods) => {
      // If the number of sign in methods is 0, that must mean the user doesn't exist
      var userExists = signInMethods.length > 0;

      if (userExists) {
        UI.showInfoBox(this, "An account with the email you provided already exists.", UI.DialogType.ERROR, { description: "Forgot your password?", page: '/forgot-password' });
      } else {
        this.props.history.push('/account-details', { email: this.state.email, password: this.state.password });
      }
    }).catch((error) => {
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
    this.setState({ errorEmail: false, errorPassword: false, errorRepeatPassword: false });
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

    const focusPasswordField = e => {
      if (e.key === 'Enter') {
        document.getElementById('passwordTextField').focus();
      }
    }

    const focusRepeatPasswordField = e => {
      if (e.key === 'Enter') {
        document.getElementById('repeatPasswordTextField').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleCreateAccount(e);
      }
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
        <div className="sign-up-form-container">
          <div className="sign-up-heading-group">
            <UI.Heading className="sign-up-heading">Sign up</UI.Heading>
            <UI.Subheading>Fill in all the fields below to create an account</UI.Subheading>
          </div>
          <form>
            <div className="sign-up-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorEmail ? "sign-up-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "sign-up-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorPassword ? "sign-up-error-text-field-label" : null}>password</UI.Label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "sign-up-error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={handlePasswordTextFieldChange.bind(this)} onKeyPress={focusRepeatPasswordField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorRepeatPassword ? "sign-up-error-text-field-label" : null}>repeat password</UI.Label>
              <UI.TextField id="repeatPasswordTextField" className={this.state.errorRepeatPassword ? "sign-up-error-text-field" : null} name="repeatPassword" type="password" placeholder="Repeat Password" onChange={handleRepeatPasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
          </form>
          <div id="infoBoxDiv" className="sign-up-info-box-div" hidden={true}/>
          <div className="sign-up-button-group">
            <UI.Button primary id="nextButton" className="create-account-button" type="submit" disabled={!nextButtonIsEnabled} onClick={this.handleCreateAccount}>Next</UI.Button>
          </div>
          <UI.HintButton id="loginButton" type="button" onClick={() => this.props.history.push('/login')}>I already have an account</UI.HintButton>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);