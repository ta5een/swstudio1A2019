import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import fire from '../config/Fire';
import AppDefaults from '../AppDefaults';
import * as UI from '../controls/UI';
import './styles/SignUp.css';

const DialogType = Object.freeze({
  DEFAULT: 0,
  WARNING: 1,
  ERROR: 2
});

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

    document.getElementById('createAccountButton').blur();

    var emailTextFieldLength = document.getElementById('emailTextField').value.length;

    if (emailTextFieldLength === 0) {
      this.showInfoBox("Please enter your email.", DialogType.WARNING);
      this.setState({ errorEmail: true });
      document.getElementById('emailTextField').focus();
    } else if (!this.passwordMeetsMinLength()) {
      this.showInfoBox(`Passwords must be at least ${minPasswordLength} characters.`, DialogType.WARNING);
      this.setState({ errorPassword: true, errorRepeatPassword: true });
      document.getElementById('passwordTextField').focus();
    } else if (!this.passwordsAreIdentical()) {
      this.showInfoBox("The passwords you have entered do not match. Please try again.", DialogType.ERROR);
      this.setState({ errorPassword: true, errorRepeatPassword: true });
      document.getElementById('repeatPasswordTextField').focus();
    } else {
      this.commitCreateAccount();
    }
  }

  passwordsAreIdentical() {
    const passwordTextField = document.getElementById('passwordTextField');
    const repeatPasswordTextField = document.getElementById('repeatPasswordTextField');

    return passwordTextField.value === repeatPasswordTextField.value;
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
    this.showInfoBox("Creating account...");
  }

  showInfoBox(message, type=DialogType.DEFAULT) {
    const infoBoxDiv = document.getElementById('infoBoxDiv');

    switch (type) {
      case 1:
        ReactDOM.render(<UI.WarningBox>{message}</UI.WarningBox>, infoBoxDiv);
        break;
      case 2:
        ReactDOM.render(<UI.ErrorBox>{message}</UI.ErrorBox>, infoBoxDiv);
        break;
      default:
        ReactDOM.render(<UI.InfoBox>{message}</UI.InfoBox>, infoBoxDiv);
    }

    infoBoxDiv.hidden = false;
  }

  collapseErrorBox() {
    document.getElementById('infoBoxDiv').hidden = true;
    this.setState({ errorEmail: false, errorPassword: false, errorRepeatPassword: false });
  }

  render() {
    const isEnabled = this.state.email.length >= 3 && this.state.password.length >= minPasswordLength && this.passwordsAreIdentical();

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
      this.setState({ email: e.target.value })
    }

    const handlePasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ password: e.target.value })
    }

    const handleRepeatPasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ repeatPassword: e.target.value })
    }

    return (
      <div className="sign-up-wrapper">
        <div className="sign-up-form-container">
          <div className="sign-up-heading-group">
            <UI.Heading className="sign-up-heading">Sign Up</UI.Heading>
            <UI.Subheading>Fill in all the fields below to create an account</UI.Subheading>
          </div>
          <form>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorEmail ? "sign-up-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "sign-up-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordField.bind(this)} noValidate/>
            </div>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorPassword ? "sign-up-error-text-field-label" : null}>password</UI.Label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "sign-up-error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={handlePasswordTextFieldChange.bind(this)} onKeyPress={focusRepeatPasswordField.bind(this)} noValidate/>
            </div>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorRepeatPassword ? "sign-up-error-text-field-label" : null}>repeat password</UI.Label>
              <UI.TextField id="repeatPasswordTextField" className={this.state.errorRepeatPassword ? "sign-up-error-text-field" : null} name="repeatPassword" type="password" placeholder="Repeat Password" onChange={handleRepeatPasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
          </form>
          <div id="infoBoxDiv" className="sign-up-info-box-div" hidden={true}/>
          <div className="sign-up-button-group">
            <UI.Button primary id="createAccountButton" className="create-account-button" type="submit" disabled={!isEnabled} onClick={this.handleCreateAccount}>Create Account</UI.Button>
          </div>
          <UI.HintButton id="loginButton" type="button" onClick={() => this.props.history.push('/login')}>I already have an account</UI.HintButton>
        </div>
      </div>
    );
  }
}

export default SignUp;