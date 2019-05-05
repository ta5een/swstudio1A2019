import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import fire from '../config/Fire';

import AppDefaults from '../AppDefaults';
import './Login.css';

import * as UI from '../controls/UI';

const DialogType = Object.freeze({
  DEFAULT: 0,
  WARNING: 1,
  ERROR: 2
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorEmail: false,
      errorPassword: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    document.title = "TimeAid – Login"
  }

  handleEmailTextFieldChange(e) {
    this.collapseErrorBox();
    this.setState({ email: e.target.value })
  }

  handlePasswordTextFieldChange(e) {
    this.collapseErrorBox();
    this.setState({ password: e.target.value })
  }

  collapseErrorBox() {
    document.getElementById('infoBoxDiv').hidden = true;
    this.setState({ errorEmail: false, errorPassword: false });
  }

  // Calls Firebases signInWithEmailAndPassword()
  // Uses email and password passed by user
  // Changes auth state on app.js and redirects to home.js
  handleLogin(e) {
    e.preventDefault();

    document.getElementById('loginButton').blur();
    document.getElementById('signUpButton').blur();

    this.showInfoBox("Logging you in...");
    this.commitLogin();
  }

  commitLogin() {
    var emailTextFieldLength = document.getElementById('emailTextField').value.length;
    var passwordTextFieldLength = document.getElementById('passwordTextField').value.length;

    if (emailTextFieldLength === 0 && passwordTextFieldLength === 0) {
      this.showInfoBox("Please enter your email and password.", DialogType.WARNING);
      this.setState({ errorEmail: true, errorPassword: true });
      document.getElementById('emailTextField').focus();
    } else if (emailTextFieldLength === 0) {
      this.showInfoBox("Please enter your email.", DialogType.WARNING);
      this.setState({ errorEmail: true });
      document.getElementById('emailTextField').focus();
    } else if (passwordTextFieldLength === 0) {
      this.showInfoBox("Please enter your password.", DialogType.WARNING);
      this.setState({ errorPassword: true });
      document.getElementById('passwordTextField').focus();
    } else {
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        console.log("Signing in with user: ", user);
      }).catch((error) => {
        this.displayError(error);
      });
    }
  }

  displayError(error) {
    this.setState({ password: "" });

    document.getElementById('loginButton').disabled = true;
    document.getElementById('signUpButton').disabled = true;

    switch (error.code) {
      case 'auth/invalid-email':
        this.showInfoBox("Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", DialogType.ERROR);
        this.setState({ errorEmail: true });
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/user-not-found': // Fallthrough
      case 'auth/wrong-password':
        this.showInfoBox("Something's not right... Perhaps you've entered your email or password incorrectly?", DialogType.ERROR);
        break;
      case 'auth/user-disabled':
        this.showInfoBox("Seems like this account has been disabled. Please contact support for more information.", DialogType.ERROR);
        break;
      case 'auth/too-many-requests':
        this.showInfoBox("Woah, slow down! Look's like you've requested too many requests.", DialogType.ERROR);
        break;
      default:
        this.showInfoBox(error.message);
        return;
    }
  }

  showInfoBox(message, type=DialogType.DEFAULT) {
    var infoBoxDiv = document.getElementById('infoBoxDiv');

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

  // Creates the user with specified email and password
  // Changes auth state on app.js and redirects to home.js
  handleSignUp(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      // Do something here...
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  forgotPassword(e) {
    alert('This button does nothing now');
  }

  render() {
    const isEnabled = this.state.email.length >= 3 && this.state.password.length >= 6;

    const focusPasswordField = e => {
      if (e.key === 'Enter') {
        document.getElementById('passwordTextField').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleLogin(e);
      }
    }

    return (
      <div className="wrapper">
        <div className="form-container">
          <div className="title-group">
            <UI.Title>{AppDefaults.app.name}</UI.Title>
            <p className="caption">{AppDefaults.app.caption}</p>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="form-group" className={this.state.errorEmail ? "error-text-field-label" : null}>email</label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordField.bind(this)} noValidate/>
            </div>
            <div className="form-group">
              <label htmlFor="form-group" className={this.state.errorPassword ? "error-text-field-label" : null}>password</label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
          </form>
          <div id="infoBoxDiv" className="info-box-div" hidden={true}/>
          <div>
            <div className="button-group">
              <UI.Button id="signUpButton" className="sign-up-button" type="button" disabled={!isEnabled} onClick={this.handleSignUp}>Sign up</UI.Button>
              <UI.Button primary id="loginButton" type="submit" disabled={!isEnabled} onClick={this.handleLogin} ontouchstart="">Login</UI.Button>
            </div>
            <UI.HintButton type="button" onClick={this.forgotPassword}>Forgot your password?</UI.HintButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;